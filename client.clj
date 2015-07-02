(ns client)

(def socket (js/io))
(def user (.substring (.. js/location -search) 1))

(set-username-innerhtml-to (escape user))

(.emit socket "all")

(def divs (atom {}))

(.on socket "message" (fn [data]
                          (if (= (.-from data) user)
                           (set-send-value-to (.-content data))
                           (set (.-from data) (.-content data)))))

(defn check []
      (if ))