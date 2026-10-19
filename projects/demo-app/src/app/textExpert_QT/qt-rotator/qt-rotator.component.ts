import { CommonModule } from "@angular/common";
import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  signal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";

type SetupSection =
  | "Force"
  | "Crosshead"
  | "Strain"
  | "Grips"
  | "Transverse"
  | "Temperature";
type TargetType = "Tensile Test" | "Compression Test";
type StrainPattern = "Pattern" | "Dot" | "Line";
type SensorPosition = "top" | "middle" | "bottom" | "hidden";
interface Sensor {
  id: string;
  name: string;
  model: string;
  serial: string;
  image: string;
  linked: boolean;
  warning?: string;
}

@Component({
  selector: "app-qt-rotator",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./qt-rotator.component.html",
  styleUrls: ["./qt-rotator.component.scss"],
})
export class QtRotatorComponent implements OnDestroy, AfterViewInit {
  @Input() selectedTargetType: TargetType = "Tensile Test";
  @Output() readonly closed = new EventEmitter<void>();

  setupSections: SetupSection[] = [
    "Force",
    "Crosshead",
    "Strain",
    "Grips",
    "Transverse",
    "Temperature",
  ];
  activeSection: SetupSection = "Strain";
  selectedSensorId = "video-hp";
  sensors: Sensor[] = [
    {
      id: "video-2",
      name: "VideoXtens 2",
      model: "VideoXtens01",
      serial: "SN 243509",
      image: "/assets/qt-machines/card01.png",
      linked: true,
    },
    {
      id: "video-hp",
      name: "VideoXtens 2-120 HP",
      model: "VideoXtens01",
      serial: "SN 243508",
      image: "/assets/qt-machines/card01.png",
      linked: true,
      warning: "In use · Calibration expiring",
    },
    {
      id: "clip-on",
      name: "Clip-On Extensometer",
      model: "MakroXtens II",
      serial: "SN 243506",
      image: "/assets/qt-machines/card03.png",
      linked: false,
    },
  ];
  initialGaugeLength = 50;
  fieldOfView = 120;
  strainPattern: StrainPattern = "Pattern";
  capabilitiesExpanded = false;
  setupMessage = "";

  // QML-equivalent orbit: one animated progress value per stable sensor identity.
  // t = 0.2 (top), 0.5 (selected), 0.8 (bottom).
  // Out-of-range values -0.1 and 1.1 allow cards to animate out naturally.
  readonly orbitProgress = signal<Record<string, number>>({
    "video-2": 0.2,
    "video-hp": 0.5,
    "clip-on": 0.8,
  });
  private orbitFrame: number | null = null;
  private readonly orbitDuration = 650;

  private targetProgress(index: number, selectedIndex: number): number {
    return 0.5 + 0.3 * (index - selectedIndex);
  }

  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  private animateOrbit(): void {
    if (this.orbitFrame !== null) cancelAnimationFrame(this.orbitFrame);
    const selected = this.selectedSensorIndex;
    const startValues = this.sensors.map((s) => this.orbitProgress()[s.id]);
    const targets = this.sensors.map((_, i) =>
      this.targetProgress(i, selected),
    );
    const startedAt = performance.now();
    const step = (now: number) => {
      const elapsed = Math.min(1, (now - startedAt) / this.orbitDuration);
      const eased = this.easeInOutCubic(elapsed);
      this.orbitProgress.set(
        Object.fromEntries(
          this.sensors.map((sensor, i) => [
            sensor.id,
            startValues[i] + (targets[i] - startValues[i]) * eased,
          ]),
        ),
      );
      if (elapsed < 1) this.orbitFrame = requestAnimationFrame(step);
      else this.orbitFrame = null;
    };
    this.orbitFrame = requestAnimationFrame(step);
  }

  @ViewChild('orbitViewport') orbitViewport?: ElementRef<HTMLElement>;
  readonly orbitSize = signal({ width: 460, height: 700 });
  private orbitObserver?: ResizeObserver;
  ngAfterViewInit(): void {
    const viewport = this.orbitViewport?.nativeElement;
    if (!viewport) return;
    this.orbitObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) this.orbitSize.set({ width, height });
    });
    this.orbitObserver.observe(viewport);
  }
  private get circleGeometry() {
    const { height } = this.orbitSize();
    // Reference circles share a center outside the left edge. The inner
    // circle ends before the canvas edges instead of stretching to meet them.
    const radius = height * 0.445;
    const apex = height * 0.146;
    // Translate the shared center only; radii and curvature stay unchanged.
    const horizontalOffset = height * 0.06;
    return { radius, cx: apex - radius + horizontalOffset, cy: height * 0.495 };
  }
  orbitPoint(progress: number): { x: number; y: number } {
    const { radius, cx, cy } = this.circleGeometry;
    const halfAngle = 1.145;
    const angle = (progress * 2 - 1) * halfAngle;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  }
  // Concentric circles: the first band is narrow, the outer band is wider.
  private readonly orbitRadiusOffsets = [0, 0.13, 0.36];
  private orbitRadius(index: number): number {
    return this.circleGeometry.radius + this.orbitRadiusOffsets[index] * this.orbitSize().height;
  }
  orbitPath(index: number): string {
    const { cx, cy } = this.circleGeometry;
    const r = this.orbitRadius(index);
    return 'M ' + cx + ' ' + (cy - r) + ' A ' + r + ' ' + r + ' 0 0 1 ' + cx + ' ' + (cy + r);
  }
  orbitBand(index: number): string {
    const { cx, cy } = this.circleGeometry;
    const inner = this.orbitRadius(index), outer = this.orbitRadius(index + 1);
    return 'M ' + cx + ' ' + (cy - inner) + ' A ' + inner + ' ' + inner + ' 0 0 1 ' + cx + ' ' + (cy + inner) +
      ' L ' + cx + ' ' + (cy + outer) + ' A ' + outer + ' ' + outer + ' 0 0 0 ' + cx + ' ' + (cy - outer) + ' Z';
  }

  cardLeftPercent(sensorId: string): number {
    const point = this.orbitPoint(this.orbitProgress()[sensorId] ?? 0.5);
    const progress = this.orbitProgress()[sensorId] ?? 0.5;
    const gap = (Math.abs(progress - 0.5) < 0.05 ? 36 : 22) * this.orbitSize().height / 680;
    return (point.x + gap) / this.orbitSize().width * 100;
  }
  cardTopPercent(sensorId: string): number {
    const progress = this.orbitProgress()[sensorId] ?? 0.5;
    return (this.orbitPoint(progress).y / this.orbitSize().height + (progress - 0.5) * 0.23) * 100;
  }
  cardOpacity(sensorId: string): number {
    if (sensorId === this.selectedSensorId) return 1;
    const t = this.orbitProgress()[sensorId] ?? 0.5;
    if (t <= 0 || t >= 1) return 0;
    if (t < 0.2) return t / 0.2;
    if (t > 0.8) return (1 - t) / 0.2;
    return 1;
  }
  trackBySensorId(_index: number, sensor: Sensor): string {
    return sensor.id;
  }
  ngOnDestroy(): void {
    this.orbitObserver?.disconnect();
    if (this.orbitFrame !== null) cancelAnimationFrame(this.orbitFrame);
  }

  // Configure Strain settings displayed inside the existing Strain panel.
  showConfigureDialog = false;
  expandedConfigureGroup: string | null = null;
  calibrationExpanded = false;
  edgeDetectionSensitivity = "High";
  markLossBehavior = "Pause Test";
  imageFiltering = true;
  configureGroups = [
    {
      id: "camera",
      title: "Camera & Illumination Settings",
      description:
        "Camera and illumination settings are not configured in this UI demo.",
    },
    {
      id: "alignment",
      title: "Live Alignment & Focus",
      description:
        "Alignment and focus controls are not connected to hardware.",
    },
    {
      id: "tracking",
      title: "Advanced Tracking Parameters",
      description: "Tracking parameters are not connected to hardware.",
    },
  ];

  get selectedSensorIndex(): number {
    return this.sensors.findIndex((s) => s.id === this.selectedSensorId);
  }
  get hasTopSensor(): boolean {
    return this.selectedSensorIndex > 0;
  }
  get hasBottomSensor(): boolean {
    return (
      this.selectedSensorIndex >= 0 &&
      this.selectedSensorIndex < this.sensors.length - 1
    );
  }
  get selectedSensor(): Sensor | undefined {
    return this.sensors.find((s) => s.id === this.selectedSensorId);
  }
  getSensorPosition(sensorId: string): SensorPosition {
    const index = this.sensors.findIndex((s) => s.id === sensorId);
    if (index < 0 || this.selectedSensorIndex < 0) return "hidden";
    const offset = index - this.selectedSensorIndex;
    if (offset === -1) return "top";
    if (offset === 0) return "middle";
    if (offset === 1) return "bottom";
    return "hidden";
  }
  closeSetup(): void {
    this.closed.emit();
  }
  selectSection(section: SetupSection): void {
    this.activeSection = section;
    this.setupMessage = "";
  }
  selectSensor(sensorId: string): void {
    if (
      !this.sensors.some((s) => s.id === sensorId) ||
      this.selectedSensorId === sensorId
    )
      return;
    this.selectedSensorId = sensorId;
    this.setupMessage = "";
    this.animateOrbit();
  }
  toggleSensorLink(sensor: Sensor): void {
    sensor.linked = !sensor.linked;
    this.selectSensor(sensor.id);
    this.setupMessage = `${sensor.name} ${sensor.linked ? "linked" : "unlinked"} (demo only).`;
  }
  configureSensor(): void {
    this.expandedConfigureGroup = null;
    this.calibrationExpanded = false;
    this.showConfigureDialog = true;
  }
  toggleConfigureGroup(id: string): void {
    this.expandedConfigureGroup =
      this.expandedConfigureGroup === id ? null : id;
  }
  closeConfigureDialog(): void {
    this.showConfigureDialog = false;
  }
  saveConfigureDialog(): void {
    this.showConfigureDialog = false;
    this.setupMessage = `Configuration saved for ${this.selectedSensor?.name ?? "Sensor"} (UI demo only).`;
  }
  previousSection(): void {
    const index = this.setupSections.indexOf(this.activeSection);
    if (index > 0) this.selectSection(this.setupSections[index - 1]);
    else this.closeSetup();
  }
  applyAndGoNext(): void {
    console.log("Applied setup configuration:", {
      section: this.activeSection,
      sensor: this.selectedSensorId,
      initialGaugeLength: this.initialGaugeLength,
      fieldOfView: this.fieldOfView,
      targetType: this.strainPattern,
    });
    const index = this.setupSections.indexOf(this.activeSection);
    if (index < this.setupSections.length - 1)
      this.selectSection(this.setupSections[index + 1]);
    else this.setupMessage = "Configuration completed (demo only).";
  }
  @HostListener("document:keydown.escape")
  onEscapeKey(): void {
    if (this.showConfigureDialog) this.closeConfigureDialog();
  }
}
