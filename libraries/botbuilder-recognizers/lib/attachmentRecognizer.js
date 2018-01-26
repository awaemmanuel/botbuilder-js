"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const intentRecognizer_1 = require("./intentRecognizer");
/**
 * An intent recognizer for detecting that the user has uploaded an attachment.
 *
 * **Usage Example**
 *
 * ```js
 * const bot = new Bot(adapter)
 *      .use(new AttachmentRecognizer())
 *      .onReceive((context) => {
 *          if (context.ifIntent('Intents.AttachmentsReceived')) {
 *              // ... process uploaded file
 *          } else {
 *              // ... default logic
 *          }
 *      });
 * ```
 */
class AttachmentRecognizer extends intentRecognizer_1.IntentRecognizer {
    /**
     * Creates a new instance of the recognizer.
     *
     * @param settings (Optional) settings to customize the recognizer.
     */
    constructor(settings) {
        super();
        this.typeFilters = [];
        this.settings = Object.assign({
            intentName: 'Intents.AttachmentsReceived'
        }, settings);
        this.onRecognize((context) => {
            const intents = [];
            const attachments = context.request && context.request.attachments ? context.request.attachments : [];
            if (attachments.length > 0) {
                // Filter by content type
                if (this.typeFilters.length > 0) {
                    // Sort by content type
                    const matches = {};
                    attachments.forEach((a) => {
                        const type = a.contentType || '';
                        if (matches.hasOwnProperty(type)) {
                            matches[type].push(a);
                        }
                        else {
                            matches[type] = [a];
                        }
                    });
                    // Return intents for matches
                    this.typeFilters.forEach((filter) => {
                        const stringFilter = typeof filter.type === 'string';
                        for (const type in matches) {
                            let addIntent;
                            if (stringFilter) {
                                addIntent = type === filter.type;
                            }
                            else {
                                addIntent = filter.type.test(type);
                            }
                            if (addIntent) {
                                intents.push({
                                    score: 1.0,
                                    name: filter.intentName,
                                    entities: matches[type]
                                });
                            }
                        }
                    });
                }
                else {
                    // Return a single intent for all attachments
                    intents.push({
                        score: 1.0,
                        name: this.settings.intentName,
                        entities: attachments
                    });
                }
            }
            return intents;
        });
    }
    /**
     * Add a new content type filter to the recognizer. Adding one or more `contentType()` filters
     * will result in only attachments of the specified type(s) being recognized.
     *
     * @param contentType The `Attachment.contentType` to look for.
     * @param intentName Name of the intent to return when the given type is matched.
     */
    contentType(contentType, intentName) {
        this.typeFilters.push({ type: contentType, intentName: intentName });
        return this;
    }
}
exports.AttachmentRecognizer = AttachmentRecognizer;
//# sourceMappingURL=attachmentRecognizer.js.map