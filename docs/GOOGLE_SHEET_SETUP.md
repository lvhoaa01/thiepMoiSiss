# Google Sheet setup

The Google Sheet is your database. The Apps Script writes RSVPs here and reads
wishes back out.

## 1. Create the spreadsheet

1. Go to <https://sheets.google.com> and create a **Blank** spreadsheet.
2. Name it anything, e.g. **"Graduation RSVP"**.

## 2. The `RSVP` sheet (tab)

You can let the script create it automatically, or set it up yourself:

1. Rename the first tab to **`RSVP`** (exact, case-sensitive).
2. Put these headers in row 1:

   | A         | B    | C         | D       |
   | --------- | ---- | --------- | ------- |
   | Timestamp | Name | Attending | Message |

That's it. The script (`getSheet_`) also creates this tab + header row on first
use if it's missing — but creating it yourself avoids surprises.

## Column reference

| Column      | Written by      | Notes                                  |
| ----------- | --------------- | -------------------------------------- |
| `Timestamp` | `doPost`        | `new Date()` at submit time            |
| `Name`      | RSVP form       | required                               |
| `Attending` | RSVP dropdown   | `"yes"` or `"no"`                      |
| `Message`   | RSVP form       | optional; rows **with** a message feed the guestbook |

## Guestbook source

`doGet?action=wishes` returns every row that has a non-empty `Message`, newest
first (capped at 200). So a guest who leaves a wish appears in the guestbook; a
plain yes/no with no message does not.

➡️ Next: [APPS_SCRIPT_SETUP.md](APPS_SCRIPT_SETUP.md)
