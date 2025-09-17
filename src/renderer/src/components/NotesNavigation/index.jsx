// index.js
import { memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import NotesNavigation from "./NotesNavigation"

const MotionContainer = ({ children }) => (
    <motion.div
        initial={{ transform: "scaleX(0.95)", opacity: 0 }}
        animate={{ transform: "scaleX(1)", opacity: 1 }}
        exit={{ transform: "scaleX(0.95)", opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ transformOrigin: "left center" }}
    >
        {children}
    </motion.div>
)

const AnimatedNotesNavigation = ({ showNotesNav }) => {
    return (
        <AnimatePresence initial={false}>
            {showNotesNav && (
                <MotionContainer>
                    <NotesNavigation />
                </MotionContainer>
            )}
        </AnimatePresence>
    )
}

export default memo(AnimatedNotesNavigation)
