import browser, { Tabs } from "webextension-polyfill";
import Tab = Tabs.Tab;
import OnUpdatedChangeInfoType = Tabs.OnUpdatedChangeInfoType;

function handleUpdated(
	tabId: number,
	changeInfo: OnUpdatedChangeInfoType,
	tab: Tab
) {
	if (changeInfo.url) {
		const executing = browser.tabs.executeScript({
			file: "./content/created-date.js",
		});

		executing.then();
	}
}

browser.tabs.onUpdated.addListener(handleUpdated);
