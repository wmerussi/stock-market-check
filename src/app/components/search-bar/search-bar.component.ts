import { Component, EventEmitter, Output } from '@angular/core';
import { KeyboardEnum } from 'src/app/enums/keyboard.enum';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  public searchString: string = '';

  search() {
    this.onSearch.emit(this.searchString);
  }

  keyup(event: KeyboardEvent) {
    if (event.key === KeyboardEnum.ENTER) {
      this.search();
    }
  }
}
