# npm-cache-list

This project aim to fill the missing offline cache listing function for npm

# Installation

``"npm install --global npm-cache-list"``

# Usage

- ``"npm-cache-list      (show this list)"``
- ``"npm-cache-list help (show this list)"``
- ``"npm-cache-list all  (show all versioned packages - takes long to complete)"``
- ``"npm-cache-list list <search terms> (search the cache - terms are combined with "or", not "and")"``

# Development Story

I develop mostly in offline environments thus I depend on the cached versions of packages I use.

Most of the time, I forgot with versions I work with, and going back and forth among old projects is exhausting. Nowadays, I learned more and more on writing Javascript code, so I decided to give it a try.

I started coding by patching NPM's own codes, namely ``"lib/cache.js"``. This file is the backbone operating on cache files, but it is missing the listing option. I copied parts of ``"verify"`` function, and the rest has resolved quikcly.

At first I though about giving this patch to npm directly. Then I gave up because I am not as much confident as you may think. Maybe later, or maybe by some other contributors. Time will tell. (Also npm seems to have listing ability but somehow lost it somewhere down the road. I need to be sure about that too.)

Then, I decided to make it a global installing package so anyone that has a need for this function can find and install from now on. First time uploading a package on [npmjs.com](npmjs.com)

# Contribution

The package depends only on ``"cacache"`` external package.

Just clone/fork this repository.

Run ``"npm install"`` to get ``"cacache"``.

Then start coding, fixing, and even make the pavement to your own next npm package.

# Licencing

When I initialized the package with ``"npm init"``, i didnt changed the given ``"ISC"`` licencing name. Because I dont understand types of free licences.

You are free for this project.

And also please warn me if I somehow violate some other licencing about the code parts I used from ``"npm"`` code base.