import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicDetail } from './comic-detail';

describe('ComicDetail', () => {
  let component: ComicDetail;
  let fixture: ComponentFixture<ComicDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComicDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
