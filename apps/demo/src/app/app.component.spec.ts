import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CtsPortalsModule } from '@codethatstack/portals';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [CtsPortalsModule]
    }).compileComponents();
  }));

  it('should create the app', () => {
    console.log('Running Test');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'demo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('demo');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'CodeThatStack - Portals Demo'
    );
  });
});
