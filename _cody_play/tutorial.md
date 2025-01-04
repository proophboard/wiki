---
layout: default
title: Tutorial Basics
headline: Cody Play Tutorial
toc_order: 02
---

Let's bring [Event Modeling]({{site.baseUrl}}/event_modeling/why-event-modeling) to life with the help of Cody Play.

You'll learn the basics of working with the prototyping tool Cody Play.
{: .alert .alert-info}

We will develop an Open Space Planning app. 

- Organizers can plan an open space
- attendees can register, suggest topics and vote for them

Here is a walk-through video of the final app. It goes beyond the typical "todo list app" example.
We have two different roles with different permissions. A flexible voting limit and more. 

<div class="video-container">
    <video style="width: 100%" controls>
        <source src="{{site.baseUrl}}/assets/video/cody-play/tutorial/open_space_app_walk_through.mp4">
    </video>
</div>


After the tutorial you will be able to turn your own
Event Modeling into a real world prototype.
{: .alert .alert-success}

You can also play with the final app yourself, before starting the tutorial. 

[:arrow_forward: Open Space App](https://free.prooph-board.com/inspectio/boards/import/https%3A%2F%2Fraw.githubusercontent.com%2Fproophboard%2Fexample-boards%2Fmain%2FPlayTutorial%2FOpen%2520Space.xml?playshot=https://raw.githubusercontent.com/proophboard/example-boards/main/PlayTutorial/Open%20Space%20App.json){: .btn .btn-play target="_blank"}
{: .flex-box}


## Start Cody Play

*For the tutorial we start with a fresh board and focus on one concept at a time.*

As a first step, we need a new prooph board as our work surface, and also a clean Cody Play application. You can do the entire tutorial
in the [free version of prooph board](https://free.prooph-board.com) (no registration required), that ships with full Cody Play support.

1. Open [prooph board](https://free.prooph-board.com)
2. Add a new board and name it: **Open Space Tutorial**
3. Start a new Cody Play session (Top Menu -> Cody Play -> Start a new Session)

<div class="video-container">
    <video style="width: 100%" controls>
        <source src="{{site.baseUrl}}/assets/video/cody-play/tutorial/01-start-cody-play.webm">
    </video>
</div>

## Step 1 - First UI

Pull a [UI Card]({{site.baseUrl}}/event_storming/basic-concepts.html#ui--api) from the left sidebar and write **"Planning"** on it.
This becomes our first UI page in Cody Play so let's pass this information to Cody and check the result:

1. Open the [Cody Metadata Sidebar]({{site.baseUrl}}/board_workspace/Metadata.html) 
2. Press the orange **"Run Cody"** button at the bottom of the sidebar.
3. Switch to the Cody Play tab and find the new entry **Planning** in the app sidebar.

<div class="video-container">
    <video style="width: 100%" controls>
        <source src="{{site.baseUrl}}/assets/video/cody-play/tutorial/01-first-ui.webm">
    </video>
</div>

## Step 2 - First Command

On the **Planning** screen an open space organizer should be able to plan a new open space. Such user actions
are represented by blue [Command Cards]({{site.baseUrl}}/event_storming/basic-concepts.html#command).

1. Pull a command from the sidebar, put it below the Planning card and write **"Plan Open Space"** on it.
2. Connect the ui card with the command card. The arrow should point from **UI -> Command**.
3. Make sure that the command is selected and **Run Cody** again.

Now Cody Play knows the command, but not that the user can trigger the action from the Planning UI screen. We can tell
Cody about the connection in the right Metadata sidebar of the UI card:

1. Select the **"Planning"** UI card.
2. Find the **Page Content** section in the right Metadata sidebar.
3. Click the **Cody Suggest** button below the editor.

Cody suggests a config based on the connection we've made between the two cards:

```json
{
  "commands": [
    "PlanOpenSpace"
  ],
  "views": []
}
```

4. **Run Cody** again while the UI card is selected.
5. You can now see a button with the label **Plan Open Space** on the **Planning** UI screen.

<div class="video-container">
    <video style="width: 100%" controls>
        <source src="{{site.baseUrl}}/assets/video/cody-play/tutorial/02-first-command.webm">
    </video>
</div>

_Please Note: the video shows an older version where Cody suggests a command name prefixed with "OpenSpaceTutorial". Namespace handling has been simplified so that the default prefix (or context namespace) can be omitted._

## Step 3 - Command Schema

The organizer should provide some information about the planned Open Space. We can list the needed properties on the command card
and use Cody again to turn them into input fields.

1. Double-click on the **Plan Open Space** command card to activate the text editing mode.
2. A flying toolbar will appear next to the card. Find the **plus** icon in the toolbar and click on it.
3. Select **Insert Horizontal Rule** from the dropdown.
4. Write down these 3 properties:

```text
- Open Space Id
- Name
- Voting Limit
```

5. Find the **Schema** editor in the right Metadata sidebar and click the **Cody Suggest** button below it.
6. Cody will suggest a schema like this:

```json
{
  "openSpaceId": "string|format:uuid",
  "name": "string",
  "votingLimit": "string"
}
```

7. **Run Cody** while the command is selected.
8. Switch to Cody Play and check the **Plan Open Space** command dialog.
9. You will see two input fields for **Name** and **Voting Limit**.

<div class="video-container">
    <video style="width: 100%" controls>
        <source src="{{site.baseUrl}}/assets/video/cody-play/tutorial/03-command-schema.webm">
    </video>
</div>

Let's summarize what happened here. We wrote a description of the command. Name and description are separated by a 
[Horizontal Rule]({{site.baseUrl}}/board_workspace/Cards.html#horizontal-rules){: .alert-link}. Cody can scan a description and translate it into
a schema, which is used to render input fields in the Cody Play UI. By default, properties with `string|format:uuid` are not visible in the UI. These are **IDs**
used to identify and reference information. In our case, every Open Space automatically gets an **Open Space Id** assigned.
{: .alert .alert-info}

## Step 4 - Input Validation

The command schema is quite important. A well-defined schema is both a gatekeeper against invalid data entering the system and also an assistant for the user to provide correct data.

It's a good idea to take the time to think about conditions that define valid data. The **voting limit** for example can be narrowed to a positive integer greater than zero and with a default of three
we can make a suggestion for the user to help them pick a good setting.

1. Change the **votingLimit** schema to: `integer|minimum:1|default:3`.
2. Test the validation in Cody Play.

<div class="video-container">
    <video style="width: 100%" controls>
        <source src="{{site.baseUrl}}/assets/video/cody-play/tutorial/04-command-validation.webm">
    </video>
</div>

## Step 5 - Event Recording

Every command successfully handled in the application should result in an [event]({{site.baseUrl}}/event_storming/basic-concepts.html#domain-event) recorded as a fact in the database.
This way, the system keeps track of everything that has happened providing a rich history for data analysis, AI training, and last but not least troubleshooting of support cases.

Some domains even require this kind of ledger, but even if not it's good to have it in place to be prepared for whatever comes along in the future.

1. Pull an orange [Event]({{site.baseUrl}}/event_storming/basic-concepts.html#domain-event) from the left sidebar
2. Place it below the command.
3. Write **"Open Space Planned"** on the event card.
4. Connect the command with the event: **Command -> Event**
5. Run Cody for the **event**.
6. And also Run Cody for the **command** again.
7. Switch to Cody Play and **plan an open space**.
8. Click the **gear** icon in the top menu.
9. Select the **Database** tab in the Cody Play Backend dialog.
10. Check that the event **Open Space Planned** has been recorded in the event store.

<div class="video-container">
    <video style="width: 100%" controls>
        <source src="{{site.baseUrl}}/assets/video/cody-play/tutorial/05-event-recording.webm">
    </video>
</div>

Congratulations :fireworks: You've recorded your first event. That's the foundation for rock-solid software.
Having the events in place as unchangeable facts opens up opportunities for process automation and an effective information flow.
{: .alert .alert-success}

## Step 6 - Project Information

At the moment, organizers can't see their planned open spaces. Let's change that. 

Cody Play is an **"event sourced system"**. This means that information is derived from recorded events. The mechanism used to do that is called a **"projection"**
and prooph board makes it easy to set it up.
{: .alert .alert-info}

1. Pull a green [Information Card]({{site.baseUrl}}/event_storming/basic-concepts.html#information) from the left sidebar and place it right to the command.
2. Write down **"My Open Spaces"** on the information card.
3. Connect the event with the information card: **Event -> Information**.
4. Check the **Schema** of the information card in the right metadata sidebar:

Cody automatically suggests a schema based on the schema of the connected event:

```json
{
  "$items": {
    "openSpaceId": "string|format:uuid",
    "name": "string",
    "votingLimit": "integer|minimum:1|default:3"
  }
}
```

The schema defines a **list of open space objects**.

5. Select **openSpaceId** as Item Identifier in the metadata sidebar (above the schema editor).
6. Scroll down to the **Projection** section and turn on the toggle **"Is a projection"**.

You should see a projection configuration like this:

```json
{
    "name": "MyOpenSpacesProjection",
    "live": true,
    "cases": [
        {
            "when": "Open Space Planned",
            "then": {
                "upsert": {
                    "id": "event.openSpaceId",
                    "set": "event"
                }
            }
        }
    ]
}
```

As you can, the projection gets a **name** assigned and **cases** are defined that tell the projection mechanism how to update information **when** certain events occur.
In our case, the information from the event **Open Space Planned** is **upsert**ed (a shortcut for insert or update if exists) using the **openSpaceId** from the event to identify 
the open space within the projection dataset.
{: .alert .alert-info}

7. Run Cody for the **My Open Spaces** information card.
8. Switch to Cody Play and open the Cody Play Backend dialog again.
9. On the **Database** tab, select the projection **"MyOpenSpacesProjection"**
10. Click the **rerun** button.
11. Inspect the **Document Store** in the database viewer.

<div class="video-container">
    <video style="width: 100%" controls>
        <source src="{{site.baseUrl}}/assets/video/cody-play/tutorial/06-project-information.webm">
    </video>
</div>

You have a new collection **my_open_spaces_collection** filled with the open space that we've planned before :tada:
The projection picked up the **Open Space Planned** event, that was already recorded in the event store and projected its
information into the document store. New events will be processed automatically so that the projection is always up-to-date.
{: .alert .alert-success}

## Step 7 - View Information

Open spaces are now available in the database and can be displayed in the UI. Can you guess the next steps?
Here is how to do it:

1. Connect the **My Open Spaces** information card with the **Planning** ui card: **Infomration -> UI**
2. Select the **Planning** ui card and find the **Page Content** section in the right metadata sidebar.
3. Press the **Cody Suggest** button to get this config:

```json
{
  "commands": [
    "PlanOpenSpace"
  ],
  "views": [
    "MyOpenSpaces"
  ]
}
```

4. **Run Cody** for the **Planning** ui card again.
5. Switch to Cody Play and navigate to the **Planning** page.
6. You'll see a new table showing **name and voting limit** of the planned open spaces.

<div class="video-container">
    <video style="width: 100%" controls>
        <source src="{{site.baseUrl}}/assets/video/cody-play/tutorial/07-view-information.webm">
    </video>
</div>

_Please Note: the video shows an older version where Cody suggests command and view names prefixed with "OpenSpaceTutorial". Namespace handling has been simplified so that the default prefix (or context namespace) can be omitted._

Yeesss :muscle:! We went full circle from a blank page via command, event, and projection back to displaying a list of planned open spaces.
Cody helped us along the way with suggestions and sane defaults. For example, we didn't specify the query logic for the list of open spaces.
The good thing here is, that you can achieve quite a lot with minimal effort, but you also have access to all the details if needed.
{: .alert .alert-success}














