#!/usr/bin/env python
# -*- coding: utf-8 -*-
from jinja2 import Template
import sys, os.path

if len(sys.argv) < 3:
    print("Usage: {sys.argv[0]} tmpl_file vars_file [var1=val1 var2=val2]")
    exit(1)

vars = {}
tmpl_filename = sys.argv[1]
vars_filename = sys.argv[2]

if (not os.path.isfile(tmpl_filename)):
    print("No template file found!")
    exit(1)

if (not os.path.isfile(vars_filename)):
    print("No vars file found!")
    exit(1)

for name, value in os.environ.items():
    vars[str(name).strip()] = str(value).strip()

with open(vars_filename) as conf:
    for line in conf:
        if "=" in line:
            name, value = line.split("=")
            vars[str(name).strip()] = str(value).strip()

for i, arg in enumerate(sys.argv):
    if i > 2:
        name, value = arg.split("=")
        vars[name] = str(value).strip()

tmpl_file = open(tmpl_filename).read()
template = Template(tmpl_file)
print(template.render(vars))
