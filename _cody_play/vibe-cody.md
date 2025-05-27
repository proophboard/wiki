---
layout: default
title: Vibe Cody
toc_order: 05
---

<div class="video-container">
    <video style="width: 100%" controls poster="{{site.baseUrl}}/assets/video/vibe-cody/Vibe_Cody.png">
        <source src="{{site.baseUrl}}/assets/video/vibe-cody/vibe-cody-walk-through.webm">
    </video>
</div>

[:cyclone: Start Building Now!](https://free.prooph-board.com/inspectio/boards/import/https%3A%2F%2Fraw.githubusercontent.com%2Fproophboard%2Fexample-boards%2Frefs%2Fheads%2Fmain%2FVibe%2520Cody.xml){: .btn .btn-default target="_blank"}

(no registration required)

## What is Vibe Cody?

Vibe Cody is a natural language interface (NLI) built into the [Cody Play]({{site.baseUrl}}/cody_play/a-playground-for-your-design) prototyping platform.

**In a nutshell: You use prompts to tell Cody how your software should look and behave.**

Cody is a coding agent trained in building apps on the Cody Play platform. He is fast and provides reliable results. No hallucinations or dead ends.
{: .alert .alert-info}

Each version of your prototype can be saved as a [Playshot]({{site.baseUrl}}/cody_play/playshots) to share it with peers, and open it at any time.

The playshots are managed on a connected prooph board, and Cody can create or update an existing [Event Model]({{site.baseUrl}}/event_modeling/event-modeling-on-prooph-board), based on the information stored in the Playshot.

Vibe Cody is brand new and currently available as a beta version for testing. We'll add more features in the next weeks, and run test sessions with key users.
It's very likely that apps built with Vibe Cody can be directly deployed to production in the future. At the moment, this is only possible by generating the source code using [Cody Engine]({{site.baseUrl}}/cody/introduction){: .alert-link}
{: .alert .alert-warning}

## Product Status / Feedback / Bug Reporting

We've set up a Github project to track status. You can view the project issue board [here](https://github.com/orgs/proophboard/projects/5).

As Vibe Cody is currently under heavy development, you'll likely hit bugs when testing. Please report any bug on the board linked above or contact the prooph board team directly.
{: .alert .alert-warning}

### Questionnaire 

🙏 We kindly ask our beta testers to fill out this [Questionnaire](https://form.typeform.com/to/DeIBJyvD). 
Your feedback is very welcome and help us to make Vibe Cody the easiest tool for modern app development.

## Tips and Tricks

### Prompt Suggestions

Start typing in the instructions input to get prompt suggestions. A single space gives you all available prompts.

### Focused Elements

Cody can focus a specific element in the app to concentrate his work on this element. Many prompt suggestions only appear in combination with a focused element.
To focus an element, click the target icon next to it. Or, tell Cody to focus an element.

### Data Structures and Validation

In the first beta version of Vibe Cody you can describe a data structure by defining table columns. We'll add more possibilities with the next update!

Cody can read specific instructions to add validation logic to a data property or specify its type.

1. Start by telling Cody: **"Add the following columns to the table:"**
2. Press **Shift+Enter** to write each column into a dedicated line.

Let's say we want to develop a little Fleet Management app for a car rental company.
We already have pages and tables to manage car **Brands** and **Models**, now we want to add a table to manage individual cars in the fleet.

Cody prompt:

```text
Add the following columns to the table:

vin: string|minLength:17|maxLength:17|title:Vehicle Identification Number
brand: Brand
model: Model
licence plate
status: Ready, Booked, Damaged, Sold
bookable: boolean
```

Watch the video to see the result of this prompt:

<div class="video-container">
    <video style="width: 100%" controls poster="{{site.baseUrl}}/assets/video/vibe-cody/Vibe_Cody.png">
        <source src="{{site.baseUrl}}/assets/video/vibe-cody/vibe-cody-fleet-mgmt.webm">
    </video>
</div>

### Colors and Theming

Cody Play uses [Material UI](https://mui.com/){: target="_blank" rel="noopener noreferrer"} as UI library. It ships with powerful theming options, and a theme creator tool is available that has an AI integrated to help you with theming.
For now, Cody is trained to import themes created with the [MUI Theme Creator](https://muiv6-theme-creator.web.app/?tab=preview){: target="_blank" rel="noopener noreferrer"} tool.

Here is how it works:

1. Start by typing: **I'd like to change the color theme**
2. Cody will provide you with instructions and a link to the theme creator tool.
3. Create a theme and copy the configuration into the instructions input.
4. Switch the color mode in the theme creator and copy the configuration of the second color mode also into the instructions input.

The video demonstrates the usage:

<div class="video-container">
    <video style="width: 100%" controls poster="{{site.baseUrl}}/assets/video/vibe-cody/Vibe_Cody.png">
        <source src="{{site.baseUrl}}/assets/video/vibe-cody/vibe-cody-theming.webm">
    </video>
</div>


