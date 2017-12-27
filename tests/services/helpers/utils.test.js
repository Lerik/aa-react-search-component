import * as utils from '../../../src/services/helpers/utils';

describe('utils', () => {
  it('should return first and last name letters', () => {
    const result = utils.getUserNameInitials(['bily', 'fernandez']);
    expect(result).toEqual('BF');
  });
  it('should return only the first name', () => {
    const result = utils.getUserNameInitials(['bily', '']);
    expect(result).toEqual('B ');
  });
  it('should return empty', () => {
    const result = utils.getUserNameInitials(['', '']);
    expect(result).toEqual('  ');
  });
  it('should return first and second name letters', () => {
    const result = utils.getUserNameInitials(['bily andres', 'fernandez']);
    expect(result).toEqual('BF');
  });
  it('should return false if determined length respected', () => {
    const result = utils.isThereAnyStringNotRespectingDeterminedLength([['bily', 'andres'], 10]);
    expect(result).toEqual(false);
  });
  it('should return true if undefined value found', () => {
    const result = utils.isThereAnyStringEmpty(['peter ', ' ', undefined]);
    expect(result).toEqual(true);
  });
  it('should return list in ascending order', () => {
    const mockSortList = [
      {
        firstName: 'ABC',
        name: 'ABC',
      },
      {
        firstName: 'DEF',
        name: 'DEF',
      },
    ];
    const userResult = utils.sortUsersAlphabetical(mockSortList);
    expect(userResult).toEqual(mockSortList);

    const wishListResult = utils.sortWishListAlphabetical(mockSortList);
    expect(wishListResult).toEqual(mockSortList);
  });
  it('should return list in descending order', () => {
    const mockSortList = [
      {
        firstName: 'DEF',
        name: 'DEF',
      },
      {
        firstName: 'ABC',
        name: 'ABC',
      },
    ];
    const userResult = utils.sortUsersAlphabetical(mockSortList);
    expect(userResult).toEqual(mockSortList);

    const wishListResult = utils.sortWishListAlphabetical(mockSortList);
    expect(wishListResult).toEqual(mockSortList);
  });
  it('should return same list order', () => {
    const mockSortList = [
      {
        firstName: 'DEF',
        name: 'DEF',
      },
      {
        firstName: 'DEF',
        name: 'DEF',
      },
    ];
    const userResult = utils.sortUsersAlphabetical(mockSortList);
    expect(userResult).toEqual(mockSortList);

    const wishListResult = utils.sortWishListAlphabetical(mockSortList);
    expect(wishListResult).toEqual(mockSortList);
  });
});
