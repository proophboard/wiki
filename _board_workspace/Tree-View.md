---
layout: default
title: Tree View
---
The left sidebar contains a tree view. It's purpose is similar to a table of contents. All elements on the board are also listed in the tree view.

You can use the tree view to navigate to certain elements by clicking on them. If elements are nested within a parent (e.g. cards grouped by frame), a single click on the parent will show/hide children and a double click will navigate to the parent on the board.
{: .alert .alert-info}

## Tree Structure

Layers define the top level of the workspace (sub layers are not supported yet). Beneath them the structure is automatically derived from your activities on the board. You have two [frame types]({{site.baseurl}}/board_workspace/Frames.html) available that group elements in the tree.

### Nesting Frames

Nest Frames on the board and put Cards and other elements into them. The structure is then visible in the tree view and gives you an higher level overview when zooming out.

<img src="{{site.baseurl}}/assets/images/layers_folder_structure.gif" alt="Folder Structure" />

## Show/Hide and (Un)lock Elements

A right click on an element in the tree opens a context menu with some options. You can lock or unlock elements, which means that no one can edit it or its nested elements.

<img src="{{site.baseurl}}/assets/images/layers_show_lock.gif" alt="Folder Structure" />

## Find an element on the board

Use the filter and search bar located above the tree view to find elements. The tree view is filtered immediately and shows all matching elements.


## Working with Layers

You may know layers from drawing and image editing tools like Photoshop. In prooph board they work quite the same, but have a slightly different purpose. Let's imagine your team did a High Level Event Storming on prooph board and now you would like to sketch out some first model design ideas. You'd like to do that next to the High Level Storming to use it as a reference. Anyway, next time your team wants to continue with the High Level Storming and design-level ideas would distract other team members. With layers you can have both! Sketch ideas on dedicated layers, but hide them when the team works together on the event map.

**That's just one example of using layers to better organize ongoing work on an event map.** 

### Default Layer

<img src="{{site.baseurl}}/assets/images/layers_empty_default.png" alt="Empty Board" />

Each board has a default layer which is called `Board` by default. You'll find it in the left sidebar on the board workspace. You can rename the layer, but it is not possible to delete it (other layers are deletable, though).

### Adding a Layer

Adding a layer is quickly done. Click on the `plus icon` above the layer tree. A new layer gets added to the tree and you can set a name for it. Pressing `ESC` will abort the operation and pressing `Enter` completes it.

The layer tree is sorted alphabetically, so your new layer is moved to it's final position in the tree after pressing enter. It becomes the active layer (see below, for more information) and is therefor marked with a blue folder icon (instead of black).

<img src="{{site.baseurl}}/assets/images/layer_add_new.gif" alt="Add New Layer" />

### Switch active Layer and move Elements to it

A single click on a `folder` icon opens (or closes) it and marks the layer as active (folder icon becomes blue). New elements added to the board are basically added to the currently active layer. 

Existing elements can be moved from another layer to the active one by selecting the elements on the board and then clicking on the copy icon next to the plus above the layer tree. The folder icon becomes orange for a second to signal success of the operation. You'll now find the moved elements beneath the active layer.

<img src="{{site.baseurl}}/assets/images/layers_move_into_layer.gif" alt="Move into Layer" />

### Rename or delete a Layer

The `edit` button in the layer context menu actives an inline edit for the layer name. Rename it and press `Enter` or abort the operation with `ESC`.

Layers (and other elements) can also be deleted if you no longer need them, except the default one (see above). A quick confirmation saves you from fast unwanted clicks without getting to much in your way.

<img src="{{site.baseurl}}/assets/images/layers_delete.gif" alt="Delete Layer" />

