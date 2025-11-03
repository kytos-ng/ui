#########
Changelog
#########
All notable changes to the Kytos-NG UI project will be documented in this file.

UNRELEASED - Under development
******************************

Changed
=======
- The tabs in the Interface Details Menu are now collapsed by default
- Status Menu filters are no longer case sensitive
- Status Menu order of rows are set to DOWN/DISABLED/UP by default
- Status Menu column header size has been increased
- Fixed build of latest.zip file used in releases to not include the web-ui folder
- Added prop to `k-input` called `only_digits` to only allow digits characters to be registered when a key is pressed.
- Changed ``InfoPanel`` prop name ``mySubtitle`` to ``subtitle`` since it was used with that name across many NApps.
- Increase default font size from titles in ``k-accordion`` (collapsable panels) from 0.7 to 0.9.

Added
=====
- Status Menu now sorts tables by column
- Added pinia for state management
- Replaced ``jquery ajax`` with axios
- Added helper function for HTTP Requests
- Autocompletes now supports actions for both input and submit
- Fixed map background buttons
- Added ``enable_filter`` prop for ``k-select`` component to enable an input box which content will filter options.
- MapBox Settings will now be stored within localStorage

Fixed
=====
- ``k-select`` does not longer updates twices when clicking in any options.
- Fixed issue were clicking on MapBox with no topology threw an error.
- Fixed key presses to select an option from ``k-input-auto`` component.

[2025.1.0] - 2025-04-14
***********************

Added
=====
- Explicitly added emits and validated them.
- Added new "k-modal" component.
- Added confirmation modal when enabling/disabling interfaces
- Added unit testing functionality utilizing ``Vitest``

Removed
=======

- Removed httpVueLoader

Changed
=======
- Fixed Enter key handler on InputAutocomplete (k-input-auto)
- MenuBar now clears Infopanels before switching to a new item for better visibility.
- Replaced listeners with attrs
- Replaced value with modelValue
- Replaced the use of Vue and new Vue with the app instace
- Removed the use of this.$set() since it was deprecated
- Replaced Webpack with Vite
- Changed all SASS @imports to conform with ``Dart Sass 3.0.0``
- Switched javascripts imports to ESM

Fixed
=======
- Fixed icon v-bind within StatusMenu
- Fixed CSS issue with ``KytosBaseWithIcon`` class prop
- Fixed an issue with the ``InputAutocomplete`` ``custom-input`` local component

[2024.1.0] - 2024-08-16
***********************

No major changes since the last 2024.1.0-b2 beta release.

[2024.1.0-b2] - 2024-09-10
***********************

Fixed
=======
- Fixed buttons within ``interfaceInfo.vue`` that were using old ``on_click``.

[2024.1.0-b1] - 2024-08-05
***********************

Changed
=======
- Upgraded Vue framework to Vue3 in compatibility mode.

[2023.2.1] - 2024-06-04
***********************

Added
=====
- Added new Status Menu. This menu can be accessed with the ``ctrl + shift + 2`` hotkeys.
- All Menu Bar items can now be quickly accessed with the ``ctrl + shift`` hotkeys and their corresponding number within the Menu Bar from top to bottom.

Changed
=======
- ``README.md`` now contains latest UI documentation link.

Fixed
=====
- Fixed tooltip for inputs not displaying
- Error handler properly showing the error message as text (Issue #60)

[2023.2.0] - 2024-02-16
***********************

No major changes since the last 2023.2.0-b1 beta releases.

[2023.2.0-b1] - 2023-10-23
**************************

Changed
=======
- Added ``available_tags`` and ``tag_ranges`` to ``src/kytos/interfaceInfo``
- Added options to modify ``tag_ranges``

[2023.1.0] - 2023-06-05
***********************

No major changes since the last 2023.1.0 beta releases.

[2023.1.0-b2] - 2023-06-22
**************************

Changed
=======
- Added clear and reset functions to  ``components/kytos/inputs/Dropdown`` component
- Added clear function to ``components/kytos/inputs/Select`` component
- Changed topology graph to display ``metadata.node_name`` as a default value. If node_name is not defined, display the datapath-id


[2023.1.0-b1] - 2023-05-03
**************************

Removed
=======

- Logs on console with ``socket.io`` has been removed. In the future, it'll be supported without ``socket.io``.

[2022.3.0] - 2022-12-15
***********************

Added
=====
- New Kytos-ng logo and icon

Fixed
=====
- Fix Select component event trigger


[2022.2.0] - "kiko" - 2022-08-12
********************************

No major changes since the last pre-release.


[2022.2.0-b4] - 2022-07-13
**************************

Fix
=====
- Fix missing icons


[2022.2.0-b3] - 2022-04-15
**************************

Added
=====
- Added a toggle button to enable and disable an interface in the ``kytos/interfaceInfo`` component

[2022.2.0-b2] - 2022-04-12
**************************

Added
=====
- Added buttons to modify metadata from ``kytos/interfaceInfo``

Changed
=======
- Interface switch details component is minimized by default


[2022.2.0.b1] - 2022-04-11
**************************

Added
=====
-Added a back button to ``kytos/interfaceInfo`` to return to ``k-info-panel/switch_info``


[2022.2.0.b0] - 2022-04-07
**************************

Added
=====
-Added active, enabled, lldp, nni and uni items to ``kytos/interfaceInfo`` to be displayed in basic details
-Added a table to ``kytos/interfaceInfo`` to be displayed interface metadata

[2022.1.1] - 2022-03-14
**********************************

Fix
=======
- Fix textarea value sync event


[2022.1.0] - 2022-01-31
**********************************

Changed
=======
- New README reflecting the change to Kytos NG.


[1.4.3] - 2022-01-14
********************

Added
=====

- new UI component: k-input-auto - Input with autocomplete

Fixed
=======

- Fixed of_stats REST calls


[1.4.2] - 2021-05-31
********************

Added
=====
- Added maximize button to k-info-panel.
- Added upward or downward sorter to the k-table.


[1.4.1] - 2020-12-23
********************

Added
=====

- New CSS for the k-table and k-context-panel components.
- Added pagination to the k-table component.

Fixed
=======

- Fixed k-context-panel component template.


[1.4.0] - 2020-11-20
********************

Added
=====

- New UI component: Notification.
- Added info-panel toggle button in tabs component.
- Added close button to info-panel component.

Fixed
=====

- Fixed overlay between tabs component and other components.


[1.3.2] - 2020-10-23
********************

Fixed
=====
- Fixed accordion arrows directions
