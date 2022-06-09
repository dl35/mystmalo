#!/bin/bash

if [ -z "$1" ]
  then
    echo "No argument supplied"
fi

if [[ ! "$1" =~ ^(major|minor|patch|none)$ ]];
then
    echo "argument must be major | minor | patch | nover";
    exit
fi


if [ "$1" != "nover" ];
then
  npm version $1
else
  echo "no update version, argument is none"
fi

ng build --configuration production --aot=true --optimization=true --buildOptimizer=true --base-href=./
