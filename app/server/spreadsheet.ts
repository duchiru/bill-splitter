"use server";

import { google } from "googleapis";

const auth = new google.auth.JWT({
	email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
	key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
	scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const LOGIN_DATA_AREA = process.env.LOGIN_DATA_AREA;

export async function findUserById(id: string) {
	const rows = await sheets.spreadsheets.values.get({
		spreadsheetId: SPREADSHEET_ID,
		range: LOGIN_DATA_AREA,
	}).then(res => res.data.values || []);

	for (const row of rows) {
		if (row[1] === id) {
			return row[0];
		}
	}

	return null;
}
