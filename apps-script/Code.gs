/**
 * ============================================================================
 *  Graduation Invitation — Google Apps Script backend
 * ============================================================================
 *  A tiny JSON API on top of a Google Sheet (the "database").
 *
 *  Sheet "RSVP" columns:  Timestamp | Name | Attending | Message
 *
 *  Endpoints
 *    GET  ?action=wishes
 *         → { ok: true, data: [{ name, message, timestamp }, ...] }
 *    POST (text/plain body: JSON)
 *         { action: "rsvp", name, attending: "yes"|"no", message }
 *         → { ok: true }  (errors → { ok: false, error })
 *
 *  Deploy:  Deploy ▸ New deployment ▸ Web app
 *           Execute as:        Me
 *           Who has access:    Anyone
 *  Copy the resulting /exec URL into the website config (or env var).
 *
 *  Note on CORS: the browser POSTs with mode:"no-cors" + text/plain (a
 *  CORS-safelisted request), so no preflight is needed. GET responses are
 *  served by Google with permissive CORS and are read directly.
 * ============================================================================
 */

var SHEET_NAME = "RSVP";
var HEADERS = ["Timestamp", "Name", "Attending", "Message"];
var MAX_WISHES = 200;

/** Get (or lazily create) the RSVP sheet with a header row. */
function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

/** Build a JSON ContentService response. */
function jsonOutput_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/** GET handler — currently only the guestbook feed. */
function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) || "wishes";
    if (action === "wishes") {
      return jsonOutput_({ ok: true, data: getWishes_() });
    }
    return jsonOutput_({ ok: false, error: "unknown-action" });
  } catch (err) {
    return jsonOutput_({ ok: false, error: String(err) });
  }
}

/** POST handler — append a validated RSVP row. */
function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) || "{}";
    var body = JSON.parse(raw);

    var name = String(body.name || "").trim();
    var attending = String(body.attending || "").trim();
    var message = String(body.message || "").trim();

    if (!name) {
      return jsonOutput_({ ok: false, error: "name-required" });
    }
    if (attending !== "yes" && attending !== "no") {
      return jsonOutput_({ ok: false, error: "invalid-attending" });
    }

    getSheet_().appendRow([new Date(), name, attending, message]);
    return jsonOutput_({ ok: true });
  } catch (err) {
    return jsonOutput_({ ok: false, error: String(err) });
  }
}

/** Read rows that contain a message, newest first, capped at MAX_WISHES. */
function getWishes_() {
  var sheet = getSheet_();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  var values = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
  var wishes = [];

  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var timestamp = row[0];
    var name = String(row[1] || "").trim();
    var message = String(row[3] || "").trim();
    if (!name || !message) continue;

    wishes.push({
      name: name,
      message: message,
      timestamp:
        timestamp instanceof Date ? timestamp.toISOString() : String(timestamp),
    });
  }

  return wishes.reverse().slice(0, MAX_WISHES);
}
