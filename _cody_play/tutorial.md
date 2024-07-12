---
layout: default
title: Tutorial
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

On the "Planning" screen an open space organizer should be able to plan a new open space. Such user actions
are represented by blue [Command Cards]({{site.baseUrl}}/event_storming/basic-concepts.html#command).

1. Pull a command from the sidebar, put it below the Planning card and write **"Plan Open Space"** on it.
2. Connect the ui card with the command card. The arrow should point from UI -> Command.
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
    "OpenSpaceTutorial.PlanOpenSpace"
  ],
  "views": []
}
```

4. **Run Cody** again while the UI card is selected.
5. You should now see a button with the label **Plan Open Space** on the **Planning** UI screen.

<div class="video-container">
    <video style="width: 100%" controls>
        <source src="{{site.baseUrl}}/assets/video/cody-play/tutorial/02-first-command.webm">
    </video>
</div>


