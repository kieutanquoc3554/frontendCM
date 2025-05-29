import React, { useContext, useEffect, useState } from "react";
import "./Search.css";
import { ShopContext } from "../../Context/ShopContext";
import { Icon } from "@iconify/react";
import useVoiceRecognition from "../../Hooks/useVoiceRecognition";

const Search = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { setSearchQuery } = useContext(ShopContext);
  const [search, setSearch] = useState("");
  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  const { transcript, isListening, startListening } = useVoiceRecognition();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (transcript) {
      setSearch(transcript);
      setSearchQuery(transcript);
    }
  }, [transcript, setSearchQuery]);

  return (
    <div className="search-container">
      {isSearchOpen && (
        <input
          className="input-search"
          type="text"
          placeholder="Tìm sản phẩm..."
          value={search}
          onChange={handleSearchChange}
        />
      )}
      <div className="icon-items" onClick={handleSearchClick}>
        <Icon className="icon-search" icon="ic:sharp-search" />
      </div>
      <div className="icon-items" onClick={startListening}>
        <Icon
          className="icon-microphone"
          icon="ic:baseline-mic"
          style={{ color: isListening ? "red" : "#333" }}
        />
      </div>
    </div>
  );
};

export default Search;
