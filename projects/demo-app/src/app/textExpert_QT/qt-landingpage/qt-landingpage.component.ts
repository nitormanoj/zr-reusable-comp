import { CommonModule } from "@angular/common";
import { Component, HostListener } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SelectModule } from "primeng/select";
import { QtRotatorComponent } from "../qt-rotator/qt-rotator.component";
import { QtDocumentsComponent } from "../qt-documents/qt-documents.component";

type TargetType = "Tensile Test" | "Compression Test";
interface TestingSystem {
  id: number;
  name: string;
  image: string;
  modifiedAt: string;
}

@Component({
  selector: "app-qt-landingpage",
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule, QtRotatorComponent, QtDocumentsComponent],
  templateUrl: "./qt-landingpage.component.html",
  styleUrls: ["./qt-landingpage.component.scss"],
})
export class QtLandingpageComponent {
  analysisOpen = false;
  breadcrumbs = ["Level", "Level", "Level"];
  activeMenu = "testing";
  sidebarItems = [
    { id: "testing", icon: "bi-pc-display", label: "Testing Systems" },
    { id: "users", icon: "bi-person", label: "Users" },
    { id: "tasks", icon: "bi-check-circle", label: "Tasks" },
    { id: "documents", icon: "bi-files", label: "Documents" },
    { id: "upload", icon: "bi-upload", label: "Upload" },
    { id: "messages", icon: "bi-chat", label: "Messages" },
  ];
  testingSystems: TestingSystem[] = [
    {
      id: 1,
      name: "My Test System For Compression Test",
      image: "/assets/qt-machines/compression.png",
      modifiedAt: "03.06.2025; 10:27 AM",
    },
    {
      id: 2,
      name: "My Test System For Tensile Test",
      image: "/assets/qt-machines/tensile.png",
      modifiedAt: "03.06.2025; 10:27 AM",
    },
    {
      id: 3,
      name: "My Test System For Metal",
      image: "/assets/qt-machines/metal.png",
      modifiedAt: "03.06.2025; 10:27 AM",
    },
    {
      id: 4,
      name: "My Test System For Round Specimen",
      image: "/assets/qt-machines/round-specimen.png",
      modifiedAt: "03.06.2025; 10:27 AM",
    },
    {
      id: 5,
      name: "My Test System For Tensile Test",
      image: "/assets/qt-machines/compression.png",
      modifiedAt: "03.06.2025; 10:27 AM",
    },
  ];
  screen: "landing" | "setup" | "documents" = "landing";
  showCreateDialog = false;
  targetTypes: TargetType[] = ["Tensile Test", "Compression Test"];
  testStandards = [
    { label: "ZwickRoell (Recommended)", value: "zwickroell" },
    { label: "ISO 6892-1", value: "iso-6892" },
    { label: "ASTM E8/E8M", value: "astm-e8" },
    { label: "ISO 527-1", value: "iso-527" },
    { label: "ISO 7500-1", value: "iso-7500" },
  ];
  selectedTargetType: TargetType = "Tensile Test";
  selectedStandard = "zwickroell";
  testingLabel = "Tensile Test - G3467";
  selectMenu(menuId: string): void {
    this.activeMenu = menuId;
    if (menuId === "documents") {
      this.showCreateDialog = false;
      this.screen = "documents";
    } else if (menuId === "testing") {
      this.screen = "landing";
    }
  }
  onHeaderAction(action: string): void {
    console.log("Header action:", action);
  }
  trackBySystemId(_index: number, system: TestingSystem): number {
    return system.id;
  }
  createTestingSystem(): void {
    this.selectedTargetType = "Tensile Test";
    this.selectedStandard = "zwickroell";
    this.testingLabel = "Tensile Test - G3467";
    this.showCreateDialog = true;
  }
  closeCreateDialog(): void {
    this.showCreateDialog = false;
  }
  onTargetTypeChange(type: TargetType): void {
    this.selectedTargetType = type;
    this.testingLabel = `${type} - G3467`;
  }
  startSetup(): void {
    if (!this.testingLabel.trim()) return;
    console.log("Start setup:", {
      targetType: this.selectedTargetType,
      testStandard: this.selectedStandard,
      label: this.testingLabel.trim(),
    });
    this.closeCreateDialog();
    this.screen = "setup";
  }
  closeSetup(): void {
    this.screen = "landing";
  }

  @HostListener("document:keydown.escape")
  onEscapeKey(): void {
    if (this.showCreateDialog) this.closeCreateDialog();
  }
}
