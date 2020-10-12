import {YamlReader} from "../src/YamlReader";

it("Should resolve an object containing yml object when read is called", async () => {
    let yamlReader = new YamlReader("./integration-test/test.yml");

    let object = await yamlReader.read();

    expect(object).toEqual({
        object: {
            attribute: "attribute",
            number: 1,
            array: [
               "value", { nestedObject: {
                    attribute: "nestedAttribute",
                    number: 2 }}
    ]
    }});
})