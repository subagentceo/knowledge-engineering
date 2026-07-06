# Product Icon Reference

Visual Studio Code contains a set of built-in icons that are used in views and the editor, but can also be used in hovers, the status bar, and by extensions. These icons are **product icons** as opposed to **file icons**, which are used next to file names throughout the UI.

The product icons that ship with VS Code are contained in the Codicon icon font and form the **default** product icon theme. Extensions can provide new Product Icon Themes to redefine these icons and give VS Code a new appearance.

In order to allow this, all product icons are identified by an ID. The icon identifier is what's used in UI components in labels (`$(pencil)`), in the API as `ThemeIcon` and in contributions when icons are needed.

The association of icon identifier to an actual icon font glyph happens the product icon theme.

## Icons in labels

Icons can be used in Markdown labels in hovers, in the StatusBarItem text and QuickPickItem label API. The syntax for adding an icon in Markdown is `$(iconIdentifier)`:

```
$(alert);
```

You can also embed text and use multiple icons:

```
$(eye) $(heart) $(mark-github) GitHub
```

To place a literal `${...}` text inside a label, escape the `$` with a backslash:

```
\$(eye)
```

## Animation

You can apply a spinning animation to the following icons by appending `~spin` to the icon name:

*   `sync`
*   `loading`
*   `gear`

```
$(sync~spin)
```

## Icon contribution point

The icon contribution point allow extensions to define additional icons by ID, along with a default icon. The icon ID can then be used by the extension (or any other extensions that depend on the extension) in labels (`$(iconId)`) or at all places where a `ThemeIcon` can be used (`new ThemeIcon("iconId")`).

```
"contributes": {
  "icons": {
        "distro-ubuntu": {
            "description": "Ubuntu icon",
            "default": {
                "fontPath": "./distroicons.woff",
                "fontCharacter": "\\E001"
            }
        },
        "distro-fedora": {
            "description": "Ubuntu icon",
            "default": {
                "fontPath": "./distroicons.woff",
                "fontCharacter": "\\E002"
            }
        }
    }
}
```

Product icon themes can redefine the icon (if they know about the icon ID).

## Icon Listing

Below is a listing of the built-in product icons by identifier.

The ID of the icon identifies the location where the icon is used. The default codicon ID describes which icon from the codicon library is used by default, and the preview shows what that icon looks like.

Product Icon Themes can replace each icon individually, as well as all icons from the codicon library.

preview

identifier

default codicon ID

description

accounts-view-bar-icon

account

Accounts icon in the view bar.

breakpoints-activate

activate-breakpoints

Icon for the activate action in the breakpoints view.

breakpoints-remove-all

close-all

Icon for the Remove All action in the breakpoints view.

breakpoints-view-icon

debug-alt

View icon of the breakpoints view.

callhierarchy-incoming

call-incoming

Icon for incoming calls in the call hierarchy view.

callhierarchy-outgoing

call-outgoing

Icon for outgoing calls in the call hierarchy view.

callstack-view-icon

debug-alt

View icon of the call stack view.

callstack-view-session

bug

Icon for the session icon in the call stack view.

chat-editor-label-icon

comment-discussion

Icon of the chat editor label.

comments-view-icon

comment-discussion

View icon of the comments view.

debug-breakpoint

debug-breakpoint

Icon for breakpoints.

debug-breakpoint-conditional

debug-breakpoint-conditional

Icon for conditional breakpoints.

debug-breakpoint-conditional-disabled

debug-breakpoint-conditional-disabled

Icon for disabled conditional breakpoints.

debug-breakpoint-conditional-unverified

debug-breakpoint-conditional-unverified

Icon for unverified conditional breakpoints.

debug-breakpoint-data

debug-breakpoint-data

Icon for data breakpoints.

debug-breakpoint-data-disabled

debug-breakpoint-data-disabled

Icon for disabled data breakpoints.

debug-breakpoint-data-unverified

debug-breakpoint-data-unverified

Icon for unverified data breakpoints.

debug-breakpoint-disabled

debug-breakpoint-disabled

Icon for disabled breakpoints.

debug-breakpoint-function

debug-breakpoint-function

Icon for function breakpoints.

debug-breakpoint-function-disabled

debug-breakpoint-function-disabled

Icon for disabled function breakpoints.

debug-breakpoint-function-unverified

debug-breakpoint-function-unverified

Icon for unverified function breakpoints.

debug-breakpoint-log

debug-breakpoint-log

Icon for log breakpoints.

debug-breakpoint-log-disabled

debug-breakpoint-log-disabled

Icon for disabled log breakpoint.

debug-breakpoint-log-unverified

debug-breakpoint-log-unverified

Icon for unverified log breakpoints.

debug-breakpoint-unsupported

debug-breakpoint-unsupported

Icon for unsupported breakpoints.

debug-breakpoint-unverified

debug-breakpoint-unverified

Icon for unverified breakpoints.

debug-collapse-all

collapse-all

Icon for the collapse all action in the debug views.

debug-configure

gear

Icon for the debug configure action.

debug-console

debug-console

Icon for the debug console open action.

debug-console-clear-all

clear-all

Icon for the clear all action in the debug console.

debug-console-evaluation-input

arrow-small-right

Icon for the debug evaluation input marker.

debug-console-evaluation-prompt

chevron-right

Icon for the debug evaluation prompt.

debug-console-view-icon

debug-console

View icon of the debug console view.

debug-continue

debug-continue

Icon for the debug continue action.

debug-disconnect

debug-disconnect

Icon for the debug disconnect action.

debug-gripper

gripper

Icon for the debug bar gripper.

debug-hint

debug-hint

Icon for breakpoint hints shown on hover in editor glyph margin.

debug-pause

debug-pause

Icon for the debug pause action.

debug-restart

debug-restart

Icon for the debug restart action.

debug-restart-frame

debug-restart-frame

Icon for the debug restart frame action.

debug-reverse-continue

debug-reverse-continue

Icon for the debug reverse continue action.

debug-stackframe

debug-stackframe

Icon for a stackframe shown in the editor glyph margin.

debug-stackframe-focused

debug-stackframe-focused

Icon for a focused stackframe shown in the editor glyph margin.

debug-start

debug-start

Icon for the debug start action.

debug-step-back

debug-step-back

Icon for the debug step back action.

debug-step-into

debug-step-into

Icon for the debug step into action.

debug-step-out

debug-step-out

Icon for the debug step out action.

debug-step-over

debug-step-over

Icon for the debug step over action.

debug-stop

debug-stop

Icon for the debug stop action.

default-view-icon

window

Default view icon.

diff-editor-next-change

arrow-down

Icon for the next change action in the diff editor.

diff-editor-previous-change

arrow-up

Icon for the previous change action in the diff editor.

diff-editor-toggle-whitespace

whitespace

Icon for the toggle whitespace action in the diff editor.

diff-insert

add

Line decoration for inserts in the diff editor.

diff-remove

remove

Line decoration for removals in the diff editor.

diff-review-close

close

Icon for 'Close' in diff review.

diff-review-insert

add

Icon for 'Insert' in diff review.

diff-review-remove

remove

Icon for 'Remove' in diff review.

disassembly-editor-label-icon

debug

Icon of the disassembly editor label.

explorer-view-icon

files

View icon of the explorer view.

extensions-clear-search-results

clear-all

Icon for the 'Clear Search Result' action in the extensions view.

extensions-configure-recommended

pencil

Icon for the 'Configure Recommended Extensions' action in the extensions view.

extensions-editor-label-icon

extensions

Icon of the extension editor label.

extensions-filter

filter

Icon for the 'Filter' action in the extensions view.

extensions-info-message

info

Icon shown with an info message in the extensions editor.

extensions-install-count

cloud-download

Icon shown along with the install count in the extensions view and editor.

extensions-install-local-in-remote

cloud-download

Icon for the 'Install Local Extension in Remote' action in the extensions view.

extensions-install-workspace-recommended

cloud-download

Icon for the 'Install Workspace Recommended Extensions' action in the extensions view.

extensions-manage

gear

Icon for the 'Manage' action in the extensions view.

extensions-rating

star

Icon shown along with the rating in the extensions view and editor.

extensions-refresh

refresh

Icon for the 'Refresh' action in the extensions view.

extensions-remote

remote

Icon to indicate that an extension is remote in the extensions view and editor.

extensions-star-empty

star-empty

Empty star icon used for the rating in the extensions editor.

extensions-star-full

star-full

Full star icon used for the rating in the extensions editor.

extensions-star-half

star-half

Half star icon used for the rating in the extensions editor.

extensions-sync-enabled

sync

Icon to indicate that an extension is synced.

extensions-sync-ignored

sync-ignored

Icon to indicate that an extension is ignored when syncing.

extensions-view-icon

extensions

View icon of the extensions view.

extensions-warning-message

warning

Icon shown with a warning message in the extensions editor.

find-collapsed

chevron-right

Icon to indicate that the editor find widget is collapsed.

find-expanded

chevron-down

Icon to indicate that the editor find widget is expanded.

find-next-match

arrow-down

Icon for 'Find Next' in the editor find widget.

find-previous-match

arrow-up

Icon for 'Find Previous' in the editor find widget.

find-replace

replace

Icon for 'Replace' in the editor find widget.

find-replace-all

replace-all

Icon for 'Replace All' in the editor find widget.

find-selection

selection

Icon for 'Find in Selection' in the editor find widget.

folding-collapsed

chevron-right

Icon for collapsed ranges in the editor glyph margin.

folding-expanded

chevron-down

Icon for expanded ranges in the editor glyph margin.

getting-started-beginner

lightbulb

Icon used for the beginner category of getting started

getting-started-codespaces

github

Icon used for the codespaces category of getting started

getting-started-item-checked

pass-filled

Used to represent getting started items which have been completed

getting-started-item-unchecked

circle-large-outline

Used to represent getting started items which have not been completed

getting-started-setup

heart

Icon used for the setup category of getting started

goto-next-location

arrow-down

Icon for goto next editor location.

goto-previous-location

arrow-up

Icon for goto previous editor location.

keybindings-add

add

Icon for the add action in the keybinding UI.

keybindings-edit

edit

Icon for the edit action in the keybinding UI.

keybindings-editor-label-icon

keyboard

Icon of the keybindings editor label.

keybindings-record-keys

record-keys

Icon for the 'record keys' action in the keybinding UI.

keybindings-sort

sort-precedence

Icon for the 'sort by precedence' toggle in the keybinding UI.

loaded-scripts-view-icon

debug-alt

View icon of the loaded scripts view.

marker-navigation-next

chevron-down

Icon for goto next marker.

marker-navigation-previous

chevron-up

Icon for goto previous marker.

markers-view-filter

filter

Icon for the filter configuration in the markers view.

markers-view-icon

warning

View icon of the markers view.

markers-view-multi-line-collapsed

chevron-down

Icon indicating that multiple lines are collapsed in the markers view.

markers-view-multi-line-expanded

chevron-up

Icon indicating that multiple lines are shown in the markers view.

multi-diff-editor-label-icon

diff-multiple

Icon of the multi diff editor label.

notebook-clear

clear-all

Icon to clear cell outputs in notebook editors.

notebook-collapsed

chevron-right

Icon to annotate a collapsed section in notebook editors.

notebook-delete-cell

trash

Icon to delete a cell in notebook editors.

notebook-edit

pencil

Icon to edit a cell in notebook editors.

notebook-execute

play

Icon to execute in notebook editors.

notebook-execute-all

run-all

Icon to execute all cells in notebook editors.

notebook-expanded

chevron-down

Icon to annotate an expanded section in notebook editors.

notebook-kernel-configure

settings-gear

Configure icon in kernel configuration widget in notebook editors.

notebook-kernel-select

server-environment

Configure icon to select a kernel in notebook editors.

notebook-mimetype

code

Icon for a mime type in notebook editors.

notebook-move-down

arrow-down

Icon to move down a cell in notebook editors.

notebook-move-up

arrow-up

Icon to move up a cell in notebook editors.

notebook-open-as-text

file-code

Icon to open the notebook in a text editor.

notebook-render-output

preview

Icon to render output in diff editor.

notebook-revert

discard

Icon to revert in notebook editors.

notebook-split-cell

split-vertical

Icon to split a cell in notebook editors.

notebook-state-error

error

Icon to indicate an error state in notebook editors.

notebook-state-success

check

Icon to indicate a success state in notebook editors.

notebook-stop

primitive-square

Icon to stop an execution in notebook editors.

notebook-stop-edit

check

Icon to stop editing a cell in notebook editors.

notebook-unfold

unfold

Icon to unfold a cell in notebook editors.

notifications-clear

close

Icon for the clear action in notifications.

notifications-clear-all

clear-all

Icon for the clear all action in notifications.

notifications-collapse

chevron-down

Icon for the collapse action in notifications.

notifications-configure

gear

Icon for the configure action in notifications.

notifications-expand

chevron-up

Icon for the expand action in notifications.

notifications-hide

chevron-down

Icon for the hide action in notifications.

open-editors-view-icon

book

View icon of the open editors view.

outline-view-icon

symbol-class

View icon of the outline view.

output-view-icon

output

View icon of the output view.

panel-close

close

Icon to close a panel.

panel-maximize

chevron-up

Icon to maximize a panel.

panel-restore

chevron-down

Icon to restore a panel.

parameter-hints-next

chevron-down

Icon for show next parameter hint.

parameter-hints-previous

chevron-up

Icon for show previous parameter hint.

ports-forward-icon

plus

Icon for the forward action.

ports-open-browser-icon

globe

Icon for the open browser action.

ports-stop-forward-icon

x

Icon for the stop forwarding action.

ports-view-icon

plug

View icon of the remote ports view.

preferences-clear-input

clear-all

Icon for clear input in the settings and keybinding UI.

preferences-open-settings

go-to-file

Icon for open settings commands.

private-ports-view-icon

lock

Icon representing a private remote port.

public-ports-view-icon

eye

Icon representing a public remote port.

refactor-preview-view-icon

lightbulb

View icon of the refactor preview view.

remote-explorer-documentation

book

Documentation icon in the remote explorer view.

remote-explorer-feedback

twitter

Feedback icon in the remote explorer view.

remote-explorer-get-started

star

Getting started icon in the remote explorer view.

remote-explorer-report-issues

comment

Report issue icon in the remote explorer view.

remote-explorer-review-issues

issues

Review issue icon in the remote explorer view.

remote-explorer-view-icon

remote-explorer

View icon of the remote explorer view.

review-comment-collapse

chevron-up

Icon to collapse a review comment.

run-view-icon

debug-alt

View icon of the Run and Debug view.

runtime-extensions-editor-label-icon

extensions

Icon of the runtime extensions editor label.

search-clear-results

clear-all

Icon for clear results in the search view.

search-collapse-results

collapse-all

Icon for collapse results in the search view.

search-details

ellipsis

Icon to make search details visible.

search-editor-label-icon

search

Icon of the search editor label.

search-expand-results

expand-all

Icon for expand results in the search view.

search-hide-replace

chevron-right

Icon to collapse the replace section in the search view.

search-new-editor

new-file

Icon for the action to open a new search editor.

search-refresh

refresh

Icon for refresh in the search view.

search-remove

close

Icon to remove a search result.

search-replace

replace

Icon for replace in the search view.

search-replace-all

replace-all

Icon for replace all in the search view.

search-show-context

list-selection

Icon for toggle the context in the search editor.

search-show-replace

chevron-down

Icon to expand the replace section in the search view.

search-stop

search-stop

Icon for stop in the search view.

search-view-icon

search

View icon of the search view.

settings-add

add

Icon for the add action in the Settings UI.

settings-discard

discard

Icon for the discard action in the Settings UI.

settings-edit

edit

Icon for the edit action in the Settings UI.

settings-editor-label-icon

settings

Icon of the settings editor label.

settings-folder-dropdown

triangle-down

Icon for the folder dropdown button in the split JSON Settings editor.

settings-group-collapsed

chevron-right

Icon for a collapsed section in the split JSON Settings editor.

settings-group-expanded

chevron-down

Icon for an expanded section in the split JSON Settings editor.

settings-more-action

gear

Icon for the 'more actions' action in the Settings UI.

settings-remove

close

Icon for the remove action in the Settings UI.

settings-sync-view-icon

sync

View icon of the Settings Sync view.

settings-view-bar-icon

settings-gear

Settings icon in the view bar.

source-control-view-icon

source-control

View icon of the Source Control view.

suggest-more-info

chevron-right

Icon for more information in the suggest widget.

tasks-list-configure

gear

Configuration icon in the tasks selection list.

tasks-remove

close

Icon for remove in the tasks selection list.

terminal-kill

trash

Icon for killing a terminal instance.

terminal-new

add

Icon for creating a new terminal instance.

terminal-rename

gear

Icon for rename in the terminal quick menu.

terminal-view-icon

terminal

View icon of the terminal view.

test-view-icon

beaker

View icon of the test view.

testing-cancel-icon

close

Icon to cancel ongoing test runs.

testing-debug-icon

debug-alt

Icon of the "debug test" action.

testing-error-icon

warning

Icon shown for tests that have an error.

testing-failed-icon

close

Icon shown for tests that failed.

testing-passed-icon

pass

Icon shown for tests that passed.

testing-queued-icon

watch

Icon shown for tests that are queued.

testing-run-all-icon

run-all

Icon of the "run all tests" action.

testing-run-icon

run

Icon of the "run test" action.

testing-show-as-list-icon

list-tree

Icon shown when the test explorer is disabled as a tree.

testing-skipped-icon

debug-step-over

Icon shown for tests that are skipped.

testing-unset-icon

circle-outline

Icon shown for tests that are in an unset state.

timeline-open

history

Icon for the open timeline action.

timeline-pin

pin

Icon for the pin timeline action.

timeline-refresh

refresh

Icon for the refresh timeline action.

timeline-unpin

pinned

Icon for the unpin timeline action.

timeline-view-icon

history

View icon of the timeline view.

variables-view-icon

debug-alt

View icon of the variables view.

view-pane-container-collapsed

chevron-right

Icon for a collapsed view pane container.

view-pane-container-expanded

chevron-down

Icon for an expanded view pane container.

watch-expressions-add

add

Icon for the add action in the watch view.

watch-expressions-add-function-breakpoint

add

Icon for the add function breakpoint action in the watch view.

watch-expressions-remove-all

close-all

Icon for the Remove All action in the watch view.

watch-view-icon

debug-alt

View icon of the watch view.

widget-close

close

Icon for the close action in widgets.

workspace-trust-editor-label-icon

shield

Icon of the workspace trust editor label.

The Codicon library contains all the icons used in VS Code views, as well as a set of useful icons.

VS Code extensions can use these icons in labels, views, and trees.

preview

identifier

account

activate-breakpoints

add

alert

archive

array

arrow-both

arrow-circle-down

arrow-circle-left

arrow-circle-right

arrow-circle-up

arrow-down

arrow-left

arrow-right

arrow-small-down

arrow-small-left

arrow-small-right

arrow-small-up

arrow-swap

arrow-up

azure-devops

azure

beaker-stop

beaker

bell

bell-dot

bell-slash

bell-slash-dot

bold

book

bookmark

bracket-dot

bracket-error

bracket

briefcase

broadcast

browser

bug

calendar

call-incoming

call-outgoing

case-sensitive

check

check-all

checklist

chevron-down

chevron-left

chevron-right

chevron-up

chip

chrome-close

chrome-maximize

chrome-minimize

chrome-restore

circle-filled

circle-large-filled

circle-large-outline

circle-outline

circle-slash

circuit-board

clear-all

clippy

clock

clone

close

close-all

close-dirty

cloud

cloud-download

cloud-upload

code

coffee

collapse-all

color-mode

combine

comment

comment-add

comment-discussion

comment-draft

comment-unresolved

compare-changes

compass-active

compass-dot

compass

console

copilot

copy

credit-card

dash

dashboard

database

debug-all

debug

debug-alt

debug-alt-small

debug-breakpoint

debug-breakpoint-conditional

debug-breakpoint-conditional-disabled

debug-breakpoint-conditional-unverified

debug-breakpoint-data

debug-breakpoint-data-disabled

debug-breakpoint-data-unverified

debug-breakpoint-disabled

debug-breakpoint-function

debug-breakpoint-function-disabled

debug-breakpoint-function-unverified

debug-breakpoint-log

debug-breakpoint-log-disabled

debug-breakpoint-log-unverified

debug-breakpoint-unsupported

debug-breakpoint-unverified

debug-console

debug-continue-small

debug-continue

debug-coverage

debug-disconnect

debug-hint

debug-line-by-line

debug-pause

debug-rerun

debug-restart

debug-restart-frame

debug-reverse-continue

debug-stackframe

debug-stackframe-active

debug-stackframe-dot

debug-stackframe-focused

debug-start

debug-step-back

debug-step-into

debug-step-out

debug-step-over

debug-stop

desktop-download

device-camera

device-camera-video

device-desktop

device-mobile

diff

diff-added

diff-ignored

diff-modified

diff-removed

diff-renamed

discard

edit

editor-layout

ellipsis

empty-window

error-small

error

exclude

expand-all

export

extensions

eye

eye-closed

eye-unwatch

eye-watch

feedback

file

file-add

file-binary

file-code

file-directory

file-directory-create

file-media

file-pdf

file-submodule

file-symlink-directory

file-symlink-file

file-text

file-zip

files

filter-filled

filter

flame

fold

fold-down

fold-up

folder

folder-active

folder-library

folder-opened

game

gather

gear

gift

gist

gist-fork

gist-new

gist-private

gist-secret

git-branch

git-branch-create

git-branch-delete

git-commit

git-compare

git-fetch

git-fork-private

git-merge

git-pull-request

git-pull-request-abandoned

git-pull-request-closed

git-pull-request-create

git-pull-request-draft

git-pull-request-new-changes

git-pull-request-go-to-changes

github

github-action

github-alt

github-inverted

globe

go-to-file

grabber

graph

graph-left

graph-line

graph-scatter

gripper

group-by-ref-type

heart

history

home

horizontal-rule

hubot

inbox

indent

info

insert

inspect

issue-closed

issue-draft

issue-opened

issue-reopened

issues

italic

jersey

json

kebab-horizontal

kebab-vertical

key

keyboard

law

layers-active

layers-dot

layers

layout-activitybar-left

layout-activitybar-right

layout-centered

layout-menubar

layout-panel-center

layout-panel-justify

layout-panel-left

layout-panel-right

layout-panel

layout-sidebar-left

layout-sidebar-right

layout-statusbar

layout

library

light-bulb

lightbulb

lightbulb-autofix

link

link-external

list-filter

list-flat

list-ordered

list-selection

list-tree

list-unordered

live-share

loading

location

lock-small

lock

log-in

log-out

logo-github

magnet

mail

mail-read

mail-reply

mark-github

markdown

megaphone

mention

menu

merge

mic

mic-filled

microscope

milestone

mirror

mirror-private

mirror-public

more

mortar-board

move

multiple-windows

music

mute

new-file

new-folder

newline

no-newline

note

notebook

notebook-template

octoface

open-preview

organization

organization-filled

organization-outline

output

package

paintcan

pass

pass-filled

pencil

person

person-add

person-filled

person-follow

person-outline

pie-chart

piano

pin

pinned

pinned-dirty

play

play-circle

plug

plus

preserve-case

preview

primitive-dot

primitive-square

project

pulse

question

quote

radio-tower

reactions

record

record-keys

record-small

redo

references

refresh

regex

remote

remote-explorer

remove

remove-close

repl

replace

replace-all

reply

repo

repo-clone

repo-create

repo-delete

repo-force-push

repo-forked

repo-pull

repo-push

repo-sync

report

request-changes

rocket

root-folder

root-folder-opened

rss

ruby

run

run-all

run-above

run-below

run-errors

save

save-all

save-as

screen-full

screen-normal

search

search-save

search-stop

search-fuzzy

selection

send

server

server-environment

server-process

settings

settings-gear

shield

sign-in

sign-out

smiley

snake

sparkle

sort-precedence

source-control

split-horizontal

split-vertical

squirrel

star

star-add

star-delete

star-empty

star-full

star-half

stop

stop-circle

symbol-array

symbol-boolean

symbol-class

symbol-color

symbol-constant

symbol-constructor

symbol-enum

symbol-enum-member

symbol-event

symbol-field

symbol-file

symbol-folder

symbol-function

symbol-interface

symbol-key

symbol-keyword

symbol-method

symbol-misc

symbol-module

symbol-namespace

symbol-null

symbol-number

symbol-numeric

symbol-object

symbol-operator

symbol-package

symbol-parameter

symbol-property

symbol-reference

symbol-ruler

symbol-snippet

symbol-string

symbol-struct

symbol-structure

symbol-text

symbol-type-parameter

symbol-unit

symbol-value

symbol-variable

sync

sync-ignored

tag-add

tag-remove

tag

target

tasklist

telescope

terminal-bash

terminal-cmd

terminal-debian

terminal-linux

terminal-powershell

terminal-tmux

terminal-ubuntu

terminal

text-size

three-bars

thumbsdown

thumbsdown-filled

thumbsup

thumbsup-filled

tools

trash

trashcan

triangle-down

triangle-left

triangle-right

triangle-up

twitter

type-hierarchy

type-hierarchy-sub

type-hierarchy-super

unfold

ungroup-by-ref-type

unlock

unmute

unverified

variable

verified-filled

verified

versions

vm

vm-active

vm-connect

vm-outline

vm-running

vr

warning

watch

whitespace

whole-word

window

word-wrap

workspace-trusted

workspace-unknown

workspace-untrusted

wrench

wrench-subaction

x

zap

zoom-in

zoom-out

7/1/2026