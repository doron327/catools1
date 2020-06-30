chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("Im in click listener: " + request);

        if (request.trigger === true) {
            triggerCatFlow(false);
        } else {
            chrome.cookies.set({
                url: "http://buildtools1.service-now.com/",
                name: "catools1",
                value: request.imageId.toString()
            });
        }
        sendResponse(true);
    }
);

chrome.browserAction.onClicked.addListener(function (tab) {
    triggerCatFlow(true);
});

function triggerCatFlow(isClick) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.cookies.get({url: "http://buildtools1.service-now.com/", name: "catools1"}, function (cookie) {
                var imageId;
                if (cookie) {
                    imageId = cookie.value.toString();
                }

                chrome.tabs.sendMessage(tabs[0].id, {click: isClick, imageId: imageId}, function (response) {
                    console.log(response.farewell);
                });

            });
        }
    )
    ;
}
