/**
 * @module botbuilder-recognizers
 */
/** second comment block */
import { BotContext, Middleware, Promiseable } from 'botbuilder';
import { Intent } from './intentSet';
/**
 * Middleware that's the base class for all intent recognizers.
 *
 * __Extends BotContext:__
 * * context.topIntent - The top recognized `Intent` for the users utterance.
 */
export declare class IntentRecognizer<T = any> implements Middleware {
    private enabledChain;
    private recognizeChain;
    private filterChain;
    receiveActivity(context: BotContext, next: () => Promise<void>): Promise<void>;
    /**
     * Recognizes intents for the current context. The return value is 0 or more recognized intents.
     *
     * @param context Context for the current turn of the conversation.
     */
    recognize(context: BotContext): Promise<Intent<T>[]>;
    /**
     * Adds a handler that lets you conditionally determine if a recognizer should run. Multiple
     * handlers can be registered and they will be called in the reverse order they are added
     * so the last handler added will be the first called.
     *
     * @param handler Function that will be called anytime the recognizer is run. If the handler
     * returns true the recognizer will be run. Returning false disables the recognizer.
     */
    onEnabled(handler: (context: BotContext) => Promiseable<boolean>): this;
    /**
     * Adds a handler that will be called to recognize the users intent. Multiple handlers can
     * be registered and they will be called in the reverse order they are added so the last
     * handler added will be the first called.
     *
     * @param handler Function that will be called to recognize a users intent.
     */
    onRecognize(handler: (context: BotContext) => Promiseable<Intent<T>[]>): this;
    /**
     * Adds a handler that will be called post recognition to filter the output of the recognizer.
     * The filter receives all of the intents that were recognized and can return a subset, or
     * additional, or even all new intents as its response. This filtering adds a convenient second
     * layer of processing to intent recognition. Multiple handlers can be registered and they will
     * be called in the order they are added.
     *
     * @param handler Function that will be called to filter the output intents. If an array is returned
     * that will become the new set of output intents passed on to the next filter. The final filter in
     * the chain will reduce the output set of intents to a single top scoring intent.
     */
    onFilter(handler: (context: BotContext, intents: Intent<T>[]) => Promiseable<Intent<T>[] | void>): this;
    private runEnabled(context);
    private runRecognize(context);
    private runFilter(context, intents);
}
