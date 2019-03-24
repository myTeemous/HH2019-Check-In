# HH2019-Check-In
Check in and look up service for HackHouston 2019

ERRORS I HAVE ENCOUNTERED
----
UNRESOLVED
----
1. response type from '/' POST endpoint is text/html even though I use res.json({myRes: data}).
   I am currently forced to use res.text() after receiving the response in the fetch API and 
   work with the JSON as a string.
   res.text() returns it in this format: "{"myRes":data}".
   BUT IT WORKS!

2. Have yet to figure out how file paths work when linking files in static html docs and css files.