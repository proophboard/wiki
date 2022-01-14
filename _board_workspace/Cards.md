---
layout: default
title: Working With Cards
---

Modeling on prooph board is mainly done with colored Cards. The color codes are inspired by Event Storming sticky colors. This makes it easier to switch between digital and onsite Event Stormings.

## Adding a Card
Cards can be dragged from the left sidebar. A legend helps with mapping colors to different concepts like [events, commands and aggregates]({{site.baseurl}}/event_storming/basic-concepts.html).

## Writing on Cards

When writing on a card a toolbar shows up with text formatting options like changing text size and color, insert links and horizontal rulers.

## Horizontal rulers
A horizontal ruler on a Card has special meaning.
It divides the name of the Card from it's details.
The name of the card is used to reference it in the [tree view]({{site.baseurl}}/collaborative_modelling/tree-view.html) and for history entries.
When you select a card and press **Ctrl+F** (Cmd+F on Mac), the Card is looked up in the tree view using it's name.
This way you can quickly find Cards with the same name on a large board.

After a horizontal ruler text alignment switches from **centered** to **left aligned** like shown in the example:

<img src="{{site.baseurl}}/assets/images/hr_and_lookup.gif" alt="Horizontal Ruler" />

## Autosize

Card size changes automatically according to the text.
Wordwrap is used for automatic line breaks. This means, that as long as words are not longer than the currently available width, only the height of a Card will change.
You can manually resize a Card to adjust the width. If you press **Ctrl-Key** (Cmd on Mac) while resizing, the aspect ratio of the card is fixed.

## Connecting Cards

<img src="{{site.baseurl}}/assets/images/connect.gif" alt="Connect Cards" />
