# Lens searching application

## This repo contains(WIP) the three services for the lens searching application

* Client
    - View layer
    - Apollo Client Typescript React app, that makes calls to Apollo server to display data
* Server
    - Apollo Server API layer
    - handles fetching Photos from Flickr, filtering out results by checking
        the EXIF data and checking if photo was shot using Lens_name user searched
    - bundles photos that pass above criteria
    - handle User accounts, allows for accounts, saved lens, saved photos, etc ...
    - API to maintain, trigger crawl, or update our database/table containting our full detailed lens info
* DB
    - Tables
        -- All_Lens
        -- User
