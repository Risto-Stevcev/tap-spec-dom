# Run webdriver to create the screenshot
node test.wdio.js

# Get result
diff expected.png actual.png
TEST_RESULT=$?

if [ $TEST_RESULT -eq 0 ]; then
  echo "The test output is correct, expected and actual images look the same"
else
  echo "Tests failed, expected and actual images look different"
  exit 1
fi
