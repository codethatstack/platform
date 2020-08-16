import { async, TestBed } from '@angular/core/testing';
import { CtsPortalsModule } from './portals.module';

describe('CtsPortalsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CtsPortalsModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(CtsPortalsModule).toBeDefined();
  });
});
