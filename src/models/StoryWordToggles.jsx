import I from 'immutable';

const StoryWordTogglesRecord = I.Record({
  values: null
});

export default class StoryWordToggles extends StoryWordTogglesRecord {
  constructor(values = null) {
    if (values == null) {
      values = new I.List([false, false, false, false]);
    }
    super({ values });
  }

  switch(index) {
    let toggle = this.values.toJS();
    if (index == -1) {
      if (toggle == [false, false, false, false]) {
        toggle = [true, true, true, true];
      } else if (toggle == [true, true, true, true]) {
        toggle = [false, false, false, false];
      } else {
        const b = !toggle[0];
        toggle = [b, b, b, b];
      }
    } else {
      toggle[index] = !toggle[index];
    }
    return new StoryWordToggles(new I.List(toggle));
  }
}
