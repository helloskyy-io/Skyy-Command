import {DefaultPageComponent} from "@components/dynamic/default-page/default-page.component";
import {GrafanaComponent} from "@components/dynamic/grafana/grafana.component";
import {FluxViewComponent} from "@components/dynamic/flux-view/flux-view.component";
import {ProxmoxComponent} from "@components/dynamic/proxmox/proxmox.component";
import {AnsibleComponent} from "@components/dynamic/ansible/ansible.component";
import {TerraformComponent} from "@components/dynamic/terraform/terraform.component";
import {FluxCoreComponent} from "@components/dynamic/flux-core/flux-core.component";
import {FluxEdgeComponent} from "@components/dynamic/flux-edge/flux-edge.component";

export enum Route {
  DEFAULT = 'default-page',
  GRAFANA = 'grafana',
  FLUX_VIEW = 'flux-view',
  PROXMOX = 'proxmox',
  ANSIBLE = 'ansible',
  TERRAFORM = 'terraform',
  FLUX_CORE = 'flux-core',
  FLUX_EDGE = 'flux-edge'
}

// Map route names to their corresponding components
export const componentMap: { [key: string]: any } = {
  [Route.DEFAULT]: DefaultPageComponent,
  [Route.GRAFANA]: GrafanaComponent,
  [Route.FLUX_VIEW]: FluxViewComponent,
  [Route.PROXMOX]: ProxmoxComponent,
  [Route.ANSIBLE]: AnsibleComponent,
  [Route.TERRAFORM]: TerraformComponent,
  [Route.FLUX_CORE]: FluxCoreComponent,
  [Route.FLUX_EDGE]: FluxEdgeComponent,
};

export const componentNames: { [key: string]: string } = {
  [Route.DEFAULT]: 'Home',
  [Route.GRAFANA]: 'Grafana',
  [Route.FLUX_VIEW]: 'FluxView',
  [Route.PROXMOX]: 'Proxmox',
  [Route.ANSIBLE]: 'Ansible',
  [Route.TERRAFORM]: 'Terraform',
  [Route.FLUX_CORE]: 'FluxCore',
  [Route.FLUX_EDGE]: 'FluxEdge'
  // Add other components as needed
};
