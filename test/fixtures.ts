const validRole = function () {
  return {
    slug: 'foo',
    name: 'Foo'
  };
};

const validUser = function () {
  return {
    id: 'test',
    name: 'Test',
    roles: []
  };
};

export { validRole, validUser };
