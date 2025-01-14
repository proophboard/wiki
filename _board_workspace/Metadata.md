---
layout: default
title: Metadata
toc_order: 05
---

prooph board bridges the gap between problem and solution space. Start from a High Level Event Storming and walk all the way down to a detailed solution. Therefore, prooph board offers advanced documentation features like **Metadata** support for most of the elements available on a board.

Metadata is useful to document technical details like message schema or information for [Cody]({{site.baseurl}}/cody/Cody-Server){: .alert-link} (the coding bot), without distracting non-technical team members, when working together on a board.
{: .alert .alert-info}

## Add Metadata

<img src="{{site.baseurl}}/assets/images/meta_add_metadata.gif" alt="Add Metadata" />

You can open the metadata sidebar from the context menu of a card (or other elements), the top menu or by pressing `Ctrl+M` (Cmd+M on Mac). The sidebar shows some information and you can edit the card's metadata. If a template is set (see below) for the selected card's type and no metadata is set so far, the template is loaded into the editor.

_Note: Changes are saved automatically and synchronized with your remote peers._

## Write Once, Copy to All

It's ok to duplicate cards on a board to improve readability. Too many arrows make it look chaotic. But when it comes to metadata, you want to edit it in one place. We got you covered! prooph board detects similar cards automatically and ask you to apply changes to all of them.

<img src="{{site.baseurl}}/assets/images/meta_copy_metadata.gif" alt="Copy Metadata" />

**Lookup is based on card type and name**. For the latter it is important to note that prooph board treats everything above the first horizontal ruler as [the name of a card]({{site.baseurl}}/board_workspace/Cards#horizontal-rules). This allows you to add notes, examples and other information that should be visible for all.

## Follow Connections

Cards can be connected to document a message flow e.g. a command (blue card) produces an event (orange card). Connections are listed in the metadata sidebar and a click on one moves focus to it.

<img src="{{site.baseurl}}/assets/images/meta_follow_connections.gif" alt="Follow Connections" />

## Card Metadata Templates

Metadata templates can be set per card type for each board. prooph board also ships with some default templates e.g. a JSON-Schema template for commands (blue), events (orange) and information (green). The default templates also contain information for the code generator like the `newAggregate: boolean` flag on commands which indicates that a new aggregate is created
The code generator is fully customizable, so are the templates. It's a powerful combination. 

<img src="{{site.baseurl}}/assets/images/meta_templates.gif" alt="Templates" />

## Upcoming Additions

### Syntax Support
So far the template and metadata editor supports JSON syntax. We will add a possibility to switch syntax.

### Global Templates
One of the next releases will include a way to quickly copy templates from one board to another.
