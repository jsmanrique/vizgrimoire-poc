vizgrimoire-poc
===============

Proof of Concept (PoC) for ideas and technologies for [VizGrimoire dashboards](https://github.com/VizGrimoire)

There are currently several PoC in the `src`folder:
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

* **mock**, simple mock based on Bootstrap and JQuery to work on ideas for a dashboard layout

* **ng-vizgrimoire**, inital mock for an AngularJS based dashboard

* **vizgrimore-dc**, layout for new generation Vizgrimoire Dashboards based on DC.js and Crossfilter used for [NG Grimoire Dashoards preview](http://projects.bitergia.com/previews/ng)

* **ng-vizgrimore-2**, update of previous work on _ng-vizgrimoire_, with new Yeoman based workflow and current testbed for [NG VizGrimoire for GitHub](http://github.com/bitergia/ng-vizgrimoire-github) project

Usage
-----

Download and launch a simple web server on the folder you would like to see the dashboard PoC. You can use something as simple as:

```bash
src$ python -m SimpleHTTPServer 8000
```

Latest _ng-vizgrimoire-2_ project can be build and tested using:

```bash
src/ng-vizgrimoire-2$ npm install
src/ng-vizgrimoire-2$ bower install
src/ng-vizgrimoire-2$ grunt serve
```
