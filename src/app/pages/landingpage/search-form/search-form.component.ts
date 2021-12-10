import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'flag-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Input() darkModeActive = false;
  @Output() onSearch = new EventEmitter<string>();
  searchForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initSearchForm();
  }

  private initSearchForm(): void {
    this.searchForm = this.fb.group({ searchKeyword: '' });
  }

  get searchCtrl(): FormControl {
    return <FormControl>this.searchForm.get('searchKeyword');
  }

  searchStarted(): void {
    if (!this.searchCtrl.value) return;
    this.onSearch.emit(this.searchCtrl.value);
  }

}
