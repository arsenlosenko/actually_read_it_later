# UPDATE OF EXTENSION: 19.02
# LAUNCH ON PH: 20.02

## TODOS:
 * create `settings` page with settings about default reading time asking frequency
 * create keyboard shortcut for saving current page for later
 * notify when URL is saved with notification
 * add option to ask user every morning about reading time 
 * add option how to read the article:
   - show available articles on reading time
   - open new tab as time comes
   - send notification only
 * verify added URL
 * add remove alarm option


## DOING:
 * after installation ask user about default reading time



## DONE:
 * refactor to use only `chrome.storage.sync` instead of localStorage, so extension data could be synced between devices (see this: https://developer.chrome.com/extensions/options)
 * remove all empty text inputs except one, add new when hitting `Save`
 * paste current page URL in first text entry by default
