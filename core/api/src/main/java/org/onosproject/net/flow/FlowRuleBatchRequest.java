/*
 * Copyright 2014 Open Networking Laboratory
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
package org.onosproject.net.flow;

import com.google.common.collect.Lists;
import org.onosproject.net.DeviceId;

import java.util.Collections;
import java.util.List;
import java.util.Set;

public class FlowRuleBatchRequest {

    private final long batchId;
    private final Set<FlowRuleBatchEntry> ops;


    public FlowRuleBatchRequest(long batchId, Set<FlowRuleBatchEntry> ops) {
        this.batchId = batchId;
        this.ops = Collections.unmodifiableSet(ops);


    }

    public Set<FlowRuleBatchEntry> ops() {
        return ops;
    }

    public FlowRuleBatchOperation asBatchOperation(DeviceId deviceId) {
        List<FlowRuleBatchEntry> entries = Lists.newArrayList();
        entries.addAll(ops);
        return new FlowRuleBatchOperation(entries, deviceId, batchId);
    }

    public long batchId() {
        return batchId;
    }
}
