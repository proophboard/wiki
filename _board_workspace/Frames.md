---
layout: default
title: Use Frames For Grouping
---

Frames are used to group [cards]({{site.baseurl}}/board_workspace/Cards.html) and other elements.

prooph board has two frame types:

## Context / Module Frame

Depending on the scope of the board, this frame refers to a team, a DDD Bounded Context, a sub-domain, a business capability, a software module or a (micro)service. It's meant to group information, concepts and design that belong together. And it's the next level in the [tree view]({{site.baseurl}}/board_workspace/Tree-View.html) after layers.

## Feature Frame
Within a Feature Frame you can further group elements that document a specific feature or belong to the same use case. Features are the second level below layers and contexts in the [tree view]({{site.baseurl}}/board_workspace/Tree-View.html).

## Bird View

When zooming out the content of a frame is collapsed and its label scaled. This provides you with a bird view to keep an overview on large boards.
{: .alert .alert-info}

The two frame types collapse at different zoom levels:

**Context / Module**: collapses later than **Feature** (later = more zoomed out).

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
