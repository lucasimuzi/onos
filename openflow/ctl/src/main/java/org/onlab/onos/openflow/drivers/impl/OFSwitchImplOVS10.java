package org.onlab.onos.openflow.drivers.impl;

import java.util.Collections;
import java.util.List;

import org.onlab.onos.openflow.controller.Dpid;
import org.onlab.onos.openflow.controller.driver.AbstractOpenFlowSwitch;
import org.projectfloodlight.openflow.protocol.OFDescStatsReply;
import org.projectfloodlight.openflow.protocol.OFMessage;
import org.projectfloodlight.openflow.protocol.OFPortDesc;

/**
 * OFDescriptionStatistics Vendor (Manufacturer Desc.): Nicira, Inc. Make
 * (Hardware Desc.) : Open vSwitch Model (Datapath Desc.) : None Software :
 * 1.11.90 (or whatever version + build) Serial : None
 */
public class OFSwitchImplOVS10 extends AbstractOpenFlowSwitch {

    public OFSwitchImplOVS10(Dpid dpid, OFDescStatsReply desc) {
        super(dpid);
        setSwitchDescription(desc);

    }

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "OFSwitchImplOVS10 [" + ((channel != null)
                ? channel.getRemoteAddress() : "?")
                + " DPID[" + ((getStringId() != null) ? getStringId() : "?") + "]]";
    }

    @Override
    public Boolean supportNxRole() {
        return true;
    }

    @Override
    public void startDriverHandshake() {}

    @Override
    public boolean isDriverHandshakeComplete() {
        return true;
    }

    @Override
    public void processDriverHandshakeMessage(OFMessage m) {}

    @Override
    public void write(OFMessage msg) {
        channel.write(Collections.singletonList(msg));
    }

    @Override
    public void write(List<OFMessage> msgs) {
        channel.write(msgs);
    }

    @Override
    public List<OFPortDesc> getPorts() {
        return Collections.unmodifiableList(features.getPorts());
    }


}