import * as fauxJax from "faux-jax";
import createApi from "../";

test("should pass global entry config to spec entry object", done => {
  // fauxJax.install();
  const call = createApi(
    {
      x: {
        y: {
          url: "test",
          method: "get"
        }
      }
    },
    {
      endpoint: "endpoint"
    }
  ).x.y.call;

  call(done, done);

  // (fauxJax).on('request', req => {
  //   expect(req.requestUrl).toMatch(/endpoint/)

  //   fauxJax.restore();

  //   done();
  // })

  // call(() => {}, () => {})
});

test("should replace global entry config by a specific one");

test("should compose global selector with api entry selector");

test("should have identity selector by default");

test("should concat context with api entry path");

test("should have empty global context by default");
