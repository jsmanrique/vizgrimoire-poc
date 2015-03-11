vizgrimoire-poc
===============

Proof of Concept (PoC) of ideas and technologies for [VizGrimoire dashboards](https://github.com/VizGrimoire)

There are currently two PoC in the `src`folder:
* **deprecated**, the one based on:
    * [Bootstrap 3.1.1](http://getbootstrap.com/)
    * [jasny-bootstrap off-canvas plugin](http://jasny.github.io/bootstrap/javascript/#offcanvas) for side menu
    * [JQuery](http://jquery.com/)
    * [Mustache.js](https://github.com/janl/mustache.js/)
    * [Flotr2](http://humblesoftware.com/flotr2/)
    * [holder.js](http://imsky.github.io/holder/) (only for mocks)
* **cenatic**, the one used as pilot in an R&D project for cenatic with real data from [Open Nebula grimoire dashboard](http://bitergia.com/public/previews/2014_prose/opennebula/tools/VizGrimoireJS/browser/), based on:
    * [Bootstrap 3.2](http://getbootstrap.com/)
    * [jasny-bootstrap off-canvas plugin](http://jasny.github.io/bootstrap/javascript/#offcanvas) for side menu
    * [JQuery](http://jquery.com/)
    * [Rickshaw](http://code.shutterstock.com/rickshaw/)
    * [OpenLayers](http://openlayers.org/)

* **mock**

* **ng-vizgrimoire**

Usage
-----

Dowload and launch a simple web server on the folder you would like to see the dashboard PoC. You can use something as simple as:

```bash
src$ python -m SimpleHTTPServer 8000
```
