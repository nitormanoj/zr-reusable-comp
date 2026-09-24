import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ZrSidebarComponent } from "zr-components";
import { ExamplePanelComponent } from "../../shared/example-panel/example-panel.component";

@Component({
  selector: "sc-sidebar",
  standalone: true,
  imports: [CommonModule, ZrSidebarComponent, ExamplePanelComponent],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent {
  
  basicVisible = false;
  leftVisible = false;
  rightVisible = false;


  openBasic(): void {
    this.basicVisible = true;
  }

  openLeft(): void {
    this.leftVisible = true;
  }

  openRight(): void {
    this.rightVisible = true;
  }


  basicCode = `
<button
  type="button"
  (click)="visible = true">
  Open Sidebar
</button>

<zr-sidebar
  header="Project Details"
  [(visible)]="visible">

  Sidebar Content

</zr-sidebar>
`;

  positionCode = `
<button
  type="button"
  (click)="leftVisible = true">
  Left
</button>

<button
  type="button"
  (click)="rightVisible = true">
  Right
</button>

<zr-sidebar
  header="Left Sidebar"
  position="left"
  [(visible)]="leftVisible">

  Left Sidebar Content

</zr-sidebar>

<zr-sidebar
  header="Right Sidebar"
  position="right"
  [(visible)]="rightVisible">

  Right Sidebar Content

</zr-sidebar>
`;
}
