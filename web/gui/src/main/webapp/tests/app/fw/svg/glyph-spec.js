/*
 * Copyright 2015 Open Networking Laboratory
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 ONOS GUI -- SVG -- Glyph Service - Unit Tests

 @author Simon Hunt
 */
describe('factory: fw/svg/glyph.js', function() {
    var $log, fs, gs;

    beforeEach(module('onosUtil', 'onosSvg'));

    beforeEach(inject(function (_$log_, FnService, GlyphService) {
        $log = _$log_;
        fs = FnService;
        gs = GlyphService;
    }));

    it('should define GlyphService', function () {
        expect(gs).toBeDefined();
    });

    it('should define four functions', function () {
        expect(fs.areFunctions(gs, [
            'init', 'register', 'ids', 'loadDefs'
        ])).toBeTruthy();
    });

    // TODO: unit tests for glyph functions
});