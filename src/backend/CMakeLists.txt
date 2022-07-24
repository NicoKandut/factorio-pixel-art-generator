cmake_minimum_required(VERSION 3.20)
project(backend)

set(CMAKE_CXX_STANDARD 14)

add_executable(backend
        src/factorio.cpp
        src/main.cpp)
