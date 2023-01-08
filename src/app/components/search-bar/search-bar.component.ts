import { Component, EventEmitter, Output } from '@angular/core';
import { KeyboardEnum } from 'src/app/enums/keyboard.enum';
import { MessageEnum } from 'src/app/enums/message.enum';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  public message: string = '';
  public searchString: string = '';

  search() {
    this.resetData();

    if (!this.searchString) {
      this.message = MessageEnum.EMPTY_INPUT;
      return;
    }

    this.onSearch.emit(this.searchString);
  }

  keyup(event: KeyboardEvent) {
    if (event.key === KeyboardEnum.ENTER) {
      this.search();
    }
  }

  private resetData() {
    this.message = '';
  }
}
