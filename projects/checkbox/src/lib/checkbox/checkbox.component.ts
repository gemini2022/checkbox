import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, ElementRef, forwardRef, input, viewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
  }]
})
export class CheckboxComponent implements ControlValueAccessor {
  // Inputs
  public overlaySize = input<string>();
  public checkboxSize = input<string>();
  public labelDistance = input<string>();
  public checkmarkSize = input<string>();
  public checkmarkPath = input<string>();
  public labelFontSize = input<string>();
  public containerWidth = input<string>();
  public containerHeight = input<string>();
  public containerCursor = input<string>();
  public labelFontFamily = input<string>();
  public containerMargin = input<string>();
  public containerPadding = input<string>();
  public checkboxBorderWidth = input<string>();
  public checkboxBorderRadius = input<string>();
  public labelPosition = input<'before' | 'after'>();
  public containerBackgroundHoverVisible = input(null, { transform: booleanAttribute });

  // Private
  protected checked!: boolean;
  protected hasFocus!: boolean;
  protected showHover!: boolean;
  protected borderWidth!: string;
  protected _labelDistance!: string;
  protected _checkmarkPath!: string;
  protected disabled: boolean = false;
  protected labelPositionAfter!: boolean;
  protected onChange!: (value: boolean) => void;
  private checkbox = viewChild<ElementRef<HTMLElement>>('checkbox');



  private ngOnInit() {
    this.setOverlaySize();
    this.setCheckmarkSize();
    this.setCheckmarkPath();
    this.setLabelDistance();
    this.setLabelPosition();
    this.setContainerWidth();
    this.setCheckboxBorderWidth();
    this.setCheckboxBorderRadius();
    this.setContainerBackgroundHoverVisibility();
  }



  private setOverlaySize(): void {
    const overlaySize = this.overlaySize() ? this.overlaySize() : getComputedStyle(document.documentElement).getPropertyValue('--checkbox-overlay-size');
    this.checkbox()?.nativeElement.style.setProperty('--overlay-size', overlaySize!);
  }



  private setCheckmarkSize(): void {
    const checkmarkSize = this.checkmarkSize() ? this.checkmarkSize() : getComputedStyle(document.documentElement).getPropertyValue('--checkbox-checkmark-size');
    this.checkbox()?.nativeElement.style.setProperty('--checkmark-size', checkmarkSize!);
  }



  private setCheckmarkPath(): void {
    this._checkmarkPath = this.checkmarkPath() ? this.checkmarkPath()! : getComputedStyle(document.documentElement).getPropertyValue('--checkbox-checkmark-path');
  }



  private setLabelDistance(): void {
    this._labelDistance = this.labelDistance() ? this.labelDistance()! : getComputedStyle(document.documentElement).getPropertyValue('--checkbox-label-distance');
  }



  private setLabelPosition(): void {
    const labelPosition = this.labelPosition() ? this.labelPosition() : getComputedStyle(document.documentElement).getPropertyValue('--checkbox-label-position');
    this.labelPositionAfter = labelPosition === 'before' ? false : true;
  }



  private setContainerWidth(): void {
    const containerWidth = this.containerWidth() ? this.containerWidth() : getComputedStyle(document.documentElement).getPropertyValue('--checkbox-container-width');
    this.checkbox()?.nativeElement.style.setProperty('--width', containerWidth?.length! > 0 ? containerWidth! : 'fit-content');
  }



  private setCheckboxBorderWidth(): void {
    this.borderWidth = this.checkboxBorderWidth() ? this.checkboxBorderWidth()! : getComputedStyle(document.documentElement).getPropertyValue('--checkbox-border-width');
    this.checkbox()?.nativeElement.style.setProperty('--border-width', this.borderWidth!);
  }



  private setCheckboxBorderRadius(): void {
    const borderRadius = this.checkboxBorderRadius() ? this.checkboxBorderRadius() : getComputedStyle(document.documentElement).getPropertyValue('--checkbox-border-radius');
    this.checkbox()?.nativeElement.style.setProperty('--border-radius', borderRadius!);
    const backgroundBorderRadius = (parseInt(borderRadius!) / parseInt(this.borderWidth) + 'px');
    this.checkbox()?.nativeElement.style.setProperty('--background-border-radius', backgroundBorderRadius!);
  }



  private setContainerBackgroundHoverVisibility(): void {
    this.showHover = this.containerBackgroundHoverVisible() !== null ? this.containerBackgroundHoverVisible()! : getComputedStyle(document.documentElement).getPropertyValue('--checkbox-container-background-hover-visible') === 'true';
  }



  public writeValue(checked: boolean): void {
    this.checked = checked;
  }



  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }



  public registerOnTouched(fn: any): void { }



  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}