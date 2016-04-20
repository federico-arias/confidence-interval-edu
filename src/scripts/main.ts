/// <reference path="../../typings/main.d.ts" />
import {Normal, Sample} from "./normal.ts";
import {Spheres} from "./spheres.ts";
import {Control} from "./control.ts";

let ndist = new Normal(1,34,4);
let sample = ndist.takeRandomSample(39) //of size 39
sample.registerRepresentation(new Spheres('#control'));
sample.renderRepresentations();

let init = 30; let min = 10; let max = 99;
let c = new Control('sample-means > sample', init, min, max);
c.map(size => {sample.updateSample(size)});

