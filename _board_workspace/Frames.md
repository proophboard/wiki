---
layout: default
title: Use Frames For Grouping
---

Frames are used to group [cards]({{site.baseurl}}/board_workspace/Cards.html) and other elements.

prooph board supports 3 frame types:

## Context / Module Frame

Depending on the scope of the board, this frame refers to a team, a DDD Bounded Context, a sub-domain, a business capability, a software module or a (micro)service. It's meant to group information, concepts and design that belong together. And it's the next level in the [tree view]({{site.baseurl}}/board_workspace/Tree-View.html) after layers.

## Event Modeling Swimlanes

A Swimlanes Frame behaves similar to a Context, but ships with Event Modeling Swimlanes support. Each Frame contains a timeline, a user role lane and a system module lane. You can add more role and module lanes by clicking on the plus icon that appears when selecting the first or last lane label of the Swimlanes Frame.

<div class="video-container">
    <video style="width: 100%" controls>
        <source src="{{site.baseUrl}}/assets/video/board_workspace/swimlanes_frame.webm">
    </video>
</div>



## Event Modeling Slice
Slice Frames split an Event Model into workflow steps. You can use them to group elements. Slices are the second level below contexts or swimlanes in the [tree view]({{site.baseurl}}/board_workspace/Tree-View.html).

<div class="video-container">
    <video style="width: 100%" controls>
        <source src="{{site.baseUrl}}/assets/video/board_workspace/slicing.webm">
    </video>
</div>


## Bird View

When zooming out the content of a frame is collapsed and its label scaled. This provides you with a bird view to keep an overview on large boards.
{: .alert .alert-info}

The two frame types collapse at different zoom levels:

**Context / Module**: collapses later than **Feature / Slice** (later = more zoomed out).

The bird view can be disabled for a frame. Open the context menu (right mouse click / tap and hold on touch device) and toggle **Bird View -> Hide Details**.
If you want turn off bird view for all frames, please see [Lite Mode]({{site.baseurl}}/board_workspace/Lite-Mode.html).

Disabling the collapse functionality can be useful if you want to use frames as swim lanes or sections of a canvas.
{: .alert .alert-info}

## Move Frames

To be able to navigate on the board even if a frame fills the entire screen, they only have a small drag zone. Otherwise you would always move the frame instead of moving around on the board.

<img src="{{site.baseurl}}/assets/images/bc_move.gif" alt="Move BC" />

As you can see in the GIF, the border of a frame gets highlighted when the mouse pointer is close to it. You need to select the frame, move your mouse next to border, so that the pointer turns into a hand and only then you're able to move the frame. Don't worry if it is a bit tricky at the beginning. You should get used to it quickly and it really helps to navigate on the board.

## Change Shape

Frames can have different shapes e.g. to represent different kinds of modules or contexts.

Chose a shape from **context menu -> Style**

<img src="{{site.baseurl}}/assets/images/frames_change_shape.gif" alt="Change Frame Shape" />
