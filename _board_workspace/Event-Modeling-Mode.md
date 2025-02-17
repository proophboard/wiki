---
layout: default
title: Event Modeling Mode
toc_order: 14
---

By default, every prooph board has [Event Modeling]({{site.baseUrl}}/event_modeling/why-event-modeling.html) support enabled. 

The main feature of that mode is a special [Slice]({{site.baseUrl}}/board_workspace/Frames.html#event-modeling-slice) element, that you can pull from the sidebar.

A Slice represents the smallest coherent unit of the software, e.g. one action performed by a user or one automated task step.
Event Modeling organizes the software design in swim lanes. Slices on prooph board reflect this structure, so each Slice can have multiple swim lanes.
Learn more about Slices on the [Event Modeling on prooph board]({{site.baseUrl}}/event_modeling/event-modeling-on-prooph-board.html){: .alert-link} page.
{: .alert .alert-info}

## Turn Off

You can turn off Event Modeling support in the board settings.

<div class="video-container">
    <video style="width: 100%" controls>
        <source src="{{site.baseUrl}}/assets/video/board_workspace/event-modeling-mode-turn-off.mp4">
    </video>
</div>


