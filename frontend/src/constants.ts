import {DefaultPageComponent} from "@components/dynamic/default-page/default-page.component";
import {GrafanaComponent} from "@components/dynamic/grafana/grafana.component";
import {UptimeKumaComponent} from "@components/dynamic/uptime-kuma/uptime-kuma.component";
import {CephComponent} from "@components/dynamic/ceph/ceph.component";
import {NomadComponent} from "@components/dynamic/nomad/nomad.component";
import {ProxmoxComponent} from "@components/dynamic/proxmox/proxmox.component";
import {AnsibleComponent} from "@components/dynamic/ansible/ansible.component";
import {TerraformComponent} from "@components/dynamic/terraform/terraform.component";
import {FluxCoreComponent} from "@components/dynamic/flux-core/flux-core.component";
import {FluxEdgeComponent} from "@components/dynamic/flux-edge/flux-edge.component";
import {FluxViewComponent} from "@components/dynamic/flux-view/flux-view.component";

export enum Route {
  DEFAULT = 'default-page',
  UPTIME_KUMA = 'uptime-kuma',
  GRAFANA = 'grafana',
  CEPH = 'ceph',
  NOMAD = 'nomad',
  PROXMOX = 'proxmox',
  ANSIBLE = 'ansible',
  TERRAFORM = 'terraform',
  FLUX_CORE = 'flux-core',
  FLUX_EDGE = 'flux-edge',
  FLUX_VIEW = 'flux-view',
}

// Map route names to their corresponding components
export const componentMap: { [key: string]: any } = {
  [Route.DEFAULT]: DefaultPageComponent,
  [Route.UPTIME_KUMA]: UptimeKumaComponent,
  [Route.GRAFANA]: GrafanaComponent,
  [Route.CEPH]: CephComponent,
  [Route.NOMAD]: NomadComponent,
  [Route.PROXMOX]: ProxmoxComponent,
  [Route.ANSIBLE]: AnsibleComponent,
  [Route.TERRAFORM]: TerraformComponent,
  [Route.FLUX_CORE]: FluxCoreComponent,
  [Route.FLUX_EDGE]: FluxEdgeComponent,
  [Route.FLUX_VIEW]: FluxViewComponent,
};

export const componentNames: { [key: string]: string } = {
  [Route.DEFAULT]: 'Home',
  [Route.UPTIME_KUMA]: 'UptimeKuma',
  [Route.GRAFANA]: 'Grafana',
  [Route.CEPH]: 'Ceph',
  [Route.NOMAD]: 'Nomad',
  [Route.PROXMOX]: 'Proxmox',
  [Route.ANSIBLE]: 'Ansible',
  [Route.TERRAFORM]: 'Terraform',
  [Route.FLUX_CORE]: 'FluxCore',
  [Route.FLUX_EDGE]: 'FluxEdge',
  [Route.FLUX_VIEW]: 'FluxView',
  // Add other components as needed
};
