/*
 * Copyright 2013-2017 Hewlett Packard Enterprise Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'js-testing/backbone-mock-factory'
], function(backboneMockFactory) {
    'use strict';

    return backboneMockFactory.getView(['selectTab', 'getSelectedRoute']);
});
